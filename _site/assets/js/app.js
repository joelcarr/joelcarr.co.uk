'use strict';

require.config({
    paths: {
        jquery: 'libs/jquery-1.11.0'
    }
});

// Bootstrap the application on doc ready
require([
    'jquery'
], function($) {

    var app = window.app || {};

    $(document).ready(function() {
        console.log('app ready');
    });

});