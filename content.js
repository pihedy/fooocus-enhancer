/** 
 * Content JS.
 */

jQuery(() => {

    var EnhancerObject = null;

    /**
     * Initializes a component by finding a specific DOM element and triggering a 'component-init' event.
     */
    $(function () {
        EnhancerObject = new FooocusEnhancer();

        let count = 0;

        let check = setInterval(() => {
            let result = $(document).find('div#component-234').first();

            if (result.length > 0) {
                $(document).trigger('component-init', result);

                count = 50;
            }

            if (count === 50) {
                clearInterval(check);
            }

            count++;
        }, 100);
    });

    /**
     * Attaches a MutationObserver to each '.lora_model input' element within the provided component.
     * 
     * @param {jQuery.Event} event - The 'component-init' event.
     * @param {jQuery} component - The component element that triggered the 'component-init' event.
     */
    $(document).on('component-init', (event, component) => {
        $(component).find('.lora_model input').each((index, input) => {
            let Observer = new MutationObserver((records) => {
                if (records.length === 0) {
                    return;
                }

                if ($(records[0].target).hasClass('showOptions')) {
                    return;
                }

                let inputs = $(records[0].target).find('input');

                if (inputs.length === 0) {
                    return;
                }

                $(document).trigger('change-model-word-container', $(inputs).get(0));
            });

            Observer.observe($(input).closest('div.wrap-inner').get(0), {
                attributes: true,
                attributeFilter: ['class']
            });
        });
    });

    $(document).on('change-model-word-container', (event, input) => {
        if ($(input).val() == 'None') {
            return;
        }

        let Component = $(input).closest('div.form').parent();

        let words = EnhancerObject.getByName($(input).val());

        console.log(words);

        if (words === null) {
            EnhancerObject.setByName($(input).val(), {});
        }

        removeModelWordContainer(Component);
        createModelWordContainer(Component);
    });

    function removeModelWordContainer(Component) {
        Component.find('.model-word-container').remove();
    }

    function createModelWordContainer(Component) {
        $('<div />', {
            class: 'model-word-container',
            text: 'Model Word'
        }).appendTo(Component);
    }

    /**
     * A utility class for enhancing the focus experience.
     */
    class FooocusEnhancer {
    
        /**
         * Constructs a new FooocusEnhancer instance.
         */
        constructor() {
            this._lora_models = {};

            this.bootstrap();
        }

        bootstrap() {
            for (let key in this) {
                if (key[0] != '_') {
                    continue;
                }

                let param = key.slice(1, key.length);

                if (param in this) {
                    continue;
                }

                Object.defineProperty(this, param, {
                    get: () => {
                        return this[key];
                    },
                    set: (value) => {
                        this[key] = value;
                    }
                });
            }
        }
    
        /**
         * Retrieves the data associated with the slugified version of the given value.
         * 
         * @param {string} value - The value to be slugified and used as the key.
         * 
         * @returns {any} The data associated with the slugified value, or `null` if not found.
         */
        getByName(value) {
            return this.get(this.slugify(value));
        }
    
        /**
         * Retrieves the data associated with the given slug.
         * 
         * @param {string} slug - The slug to be used as the key.
         * 
         * @returns {any} The data associated with the slug, or `null` if not found.
         */
        get(slug) {
            return this.default(this._data[slug]);
        }

        setByName(value, data) {
            this.set(this.slugify(value), data);
        }

        set(slug, value) {
            this._data[slug] = value;
        }
    
        /**
         * Returns the given value if it is not undefined or null, otherwise returns the provided simple value.
         * 
         * @param {any} value - The value to be checked.
         * @param {any} simple - The simple value to be returned if the given value is undefined or null.
         * 
         * @returns {any} The given value if not undefined or null, otherwise the simple value.
         */
        default(value, simple = null) {
            return (typeof value === 'undefined' || value === null) ? simple : value;
        }

        /**
         * Slugifies the given text by normalizing, removing special characters, and converting to lowercase.
         * 
         * @param {string} text - The text to be slugified.
         * 
         * @returns {string} The slugified text.
         */
        slugify(text) {
            return text.toString()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
    }
});
