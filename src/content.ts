/** 
 * @author: Pihedy
 */

import { createApp, watch } from 'vue';
import { storage } from '@extend-chrome/storage';

import { gradioApp } from "@/utils/gradioApp";
import { vueWrapper } from '@/utils/vueWrapper';

import { customElementsPolyfill } from '@/utils/customElementsPolyfill';
import { count } from '@/utils/count';

import { MountStore } from '@/stores/MountStore';

import { SettingsInterface } from '@/interfaces/SettingsInterface';

require('@events/ready/initDataManager');

require('@events/ready/addFooterFlagElement');
require('@events/ready/addtLoraWordObserver');

require('@events/lora-words-reload/addLoraWordInit');

let invalidated = false;

try {
    const url = window.location.href;

    let isValid = false;

    storage.local.get<SettingsInterface>({accepted_urls: []}).then((result) => {
        if (invalidated) {
            return;
        }

        if (count(result.accepted_urls) <= 0) {
            return;
        }

        if (!Array.isArray(result.accepted_urls)) {
            result.accepted_urls = Object.values(result.accepted_urls);
        }

        for (const filter of result.accepted_urls) {
            const regex = new RegExp(filter.url);

            
            if (!regex.test(url)) {
                continue;
            }
            
            isValid = true;

            break;
        }

        if (!isValid) {
            return;
        }

        const link = document.createElement('link');
        
        link.rel = 'stylesheet';
        link.href = chrome.runtime.getURL('css/main.css');

        document.head.appendChild(link);

        const initInterval = setInterval(() => {
            if (document.readyState !== 'complete') {
                return;
            }
        
            init();

            clearInterval(initInterval);
        }, 250);
    });
} catch (error) {
    console.log(error);
}

window.addEventListener('pagehide', () => {
    invalidated = true;
});

/**
 * Initializes the Gradio application by finding the first 'gradio-app' element on the page and setting it as the active element.
 * Dispatches a 'fooocus-enhancer-ready' event to signal that the initialization is complete.
 */
function init(): void {
    console.log('Fooocus Enhancer Content init.');

    let Collection = document.getElementsByTagName('gradio-app');

    if (Collection.length <= 0) {
        return;
    }

    gradioApp().setElement(Collection[0]);

    document.dispatchEvent(new CustomEvent('fooocus-enhancer-ready'));

    /** 
     * TODO: Ez ki lehet majd szervezni!
     */
    let Elements = gradioApp().findEnhancers();

    if (typeof Elements === 'undefined' || Elements.length <= 0) {
        return;
    }

    MountStore.value.total = Elements.length;

    (require as any).context('@elements', false, /\.vue$/);

    const rootApp = createApp({});

    Elements.forEach((Value: Element) => {
        let tag = Value.tagName.toLowerCase();

        if (!tag.startsWith('fe-')) {
            return;
        }

        let camel = tag.slice('fe-'.length)
            .replace(/-./g, (match) => match[1].toUpperCase())
            .replace(/^./, (match) => match.toUpperCase());

        Value.removeAttribute('data-fe-element');

        import(`@elements/${camel}.vue`).then((Module) => {
            if (!Module.default) {
                throw new Error(`Module for ${camel} does not have a default export.`);
            }

            if (customElementsPolyfill().get(tag) !== null) {
                return;
            }

            customElementsPolyfill().define(tag, vueWrapper(rootApp, Module));
        }).catch((err) => {            
            console.error(`Failed to load component`, err);
        });
    });

    watch(() => MountStore.value.current, (newValue) => {
        if (newValue !== MountStore.value.total) {
            return;
        }

        document.dispatchEvent(new CustomEvent('fooocus-enhancer-lora-words-reload'));
    });
}
