'use strict';

const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['en', 'es', 'ca'],
    directory: path.join(__dirname, '..', 'locales'),
    defaultLocale: 'en',
    autoReload: true,
    syncFiles: true,
    cookie: 'nodeApi-locale'
});

i18n.setLocale('en');

module.exports = i18n;