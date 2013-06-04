/*!
 * jQuery UI Numeric Input Extension
 *
 * Version 1.0
 *
 * Copyright (c) 2013 César Kästli (cesarkastli@gmail.com)
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 */
;(function($){

    $.widget('ui.numeric', {

        options: {
            allowDecimals: true,
            decimalSeparator: '.',
            decimalPlaces: null,
            allowNegative: true,
            negativeSign: '-'
        },

        _create: function() {

            $.extend(this.options, {
                decimalSeparator: this.element.data('numeric-separator'),
                decimalPlaces: this.element.data('numeric-decimals'),
                allowNegative: this.element.data('numeric-negative'),
                negativeSign: this.element.data('numeric-negative-sign')
            });

            if (this.options.decimalPlaces == false || this.options.decimalPlaces == 0) {
                this.options.allowDecimals = false;
            } else if (this.options.decimalPlaces == true) {
                this.options.decimalPlaces = null;
            }

            this.element
                .addClass('ui-numeric');


            this._on(this.element, {
                keypress: function(event) {

                    if (event.ctrlKey || event.charCode == 0) {
                        return true;
                    }

                    var value = $(event.target).val();

                    var character = String.fromCharCode(event.charCode);

                    var separatorPosition = value.indexOf(this.options.decimalSeparator);

                    var charactersAfterCursor = value.length - this.selectionEnd();

                    var decimals = value.split(this.options.decimalSeparator)[1] || '';

                    if (/[0-9]/.test(character)) {

                        return separatorPosition == -1
                            || this.options.decimalPlaces == null
                            || this.selectionStart() <= separatorPosition
                            || decimals.length < this.options.decimalPlaces;

                    }
                    else if (this.options.decimalSeparator == character) {

                        return this.options.allowDecimals
                            && (separatorPosition == -1 || this.selectionStart() <= separatorPosition && this.selectionEnd() > separatorPosition)
                            && this.selectionStart() != 0
                            && (this.options.decimalPlaces == null || charactersAfterCursor <= this.options.decimalPlaces);

                    }
                    else if (this.options.negativeSign == character) {

                        return this.options.allowNegative
                            && (value.indexOf(character) == -1 || this.selectionStart() == 0 && this.selectionEnd() > 0)
                            && this.selectionStart() == 0;
                    }

                    return false;
                }
            });
    	},

        selectionStart: function() {
            var input = this.element.get(0);
            if (input.createTextRange) {
                var range = document.selection.createRange().duplicate();
                range.moveEnd('character', input.value.length);
                if (range.text == '') {
                    return input.value.length;
                }
                return input.value.lastIndexOf(range.text);
            }
            return input.selectionStart;
        },

        selectionEnd: function() {
            var input = this.element.get(0);
            if (input.createTextRange) {
                var range = document.selection.createRange().duplicate();
                range.moveStart('character', -input.value.length);
                return range.text.length;
            }
            return input.selectionEnd;
        },

		_destroy: function() {
        },

    	widget: function() {
    		return this.element;
    	}

    });

})(jQuery);
