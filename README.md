Numeric
=======

A simple jQuery plugin that allows only numeric characters to be entered in a text entry box.

Usage
--

Allows numbers

    $(':text').numeric();

Just integers

    $(':text').numeric({ allowDecimals: false });

Localize the decimal separator

    $(':text').numeric({ decimalSeparator: "," });

Deny negative numbers

    $(':text').numeric({ allowNegatives: false });

Alternative markup
--

    <input type="text" data-numeric-decimals="false">

    <input type="text" data-numeric-separator=",">

    <input type="text" data-numeric-negative="false">

    <script>
      $(function(){
        $(':text').numeric();
      });
    </script>

License
--

Copyright (c) 2013 César Kästli (cesarkastli@gmail.com)

Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php)
and [GPL](http://www.opensource.org/licenses/gpl-license.php) licenses.
