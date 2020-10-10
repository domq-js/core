<p align="center"> <img src="https://cdn.svarun.dev/gh/domq-js/core/banner.jpg"/> </p>

## What ?
domQ is an absurdly small jQuery alternative for modern browsers (IE11+) that provides jQuery-style syntax for manipulating the DOM. Utilizing modern browser features to minimize the codebase, developers can use the familiar chainable methods at a fraction of the file size. 100% feature parity with jQuery isn't a goal, but domQ comes helpfully close, covering most day to day use cases.

## Why ?
> I was very bored with jquery script and wanted to try something else :see_no_evil:.

Well as a web developer i wanted to move out from jQuery and use Vanilla JS. When i realized i had to write multiple lines of code for a single action thats when i decided to create a lightweight javascript library that can do most things that `jQuery` can.

> domQ Uses [Dizzle](https://github.com/varunsridharan/dizzle) which is an alternate to jQuery's Sizzle Framework which is used for Customized CSS Selectors like `:input`, `:hidden` and **Dizzle** is bundled along with **domQ**. we both standalone & bundled versions.

## Comparison
| Size | domQ | domQ + Dizzle | Zepto | jQuery Slim |
| :--- | :--- | :---: | :---: | :---: |
| Unminified | 45.9 KB | 77.4 KB | 58.7 KB | 250 KB | 
| Minified | 20.6 KB | 31.5 KB | 26 KB | 70.6 KB |
| Minified & Gzipped | 7.50KB | 11.1 KB | 9.8 KB | 24.4 KB |

| Features | domq | domQ + Dizzle | Zepto | jQuery Slim |
| :--- | :---: |  :---: |  :---: |  :---: |
| Supports Older Browsers | ❌ | ❌ | ❌ | ✔ |
| Supports Modern Browsers | ✔ | ✔ | ✔ | ✔ |
| Actively Maintained | ✔ | ✔ | ❌ | ✔ |
| Namespaced Events | ✔ | ✔ | ❌ | ✔ |
| jQuery Selectors | ✔ | ✔ | ⚠️(Experimental Feature)| ✔ |
| ** Animation | ✔ | ✔ | ⚠️(Custom Workaround) ️| ❌ |


** domQ uses [WebAnimation's](https://github.com/web-animations/web-animations-js) API

## Usage
Get domQ from CloudFlare or jsDelivr and use it like this:

### jsDelivr
1. **domQ** : [jsDelivr](https://cdn.jsdelivr.net/npm/@domq-js/core@1.0.0/dist/standalone/domq.umd.min.js)
2. **domQ + Dizzle** : [jsDelivr](https://cdn.jsdelivr.net/npm/@domq-js/core@1.0.0/dist/bundled/domq.umd.min.js)

```html
<script src="https://cdn.jsdelivr.net/npm/@domq-js/core@1.0.0/dist/bundled/domq.umd.min.js"></script>
<script>
  domQ(function () {
    domQ('html').addClass ( 'domq-works' );
    domQ('<footer>Appended with domQ</footer>').appendTo ( document.body );
  });
</script>
```

domQ is also available through [npm](https://npmjs.com/) as the [`@domq-js/core`](https://npmjs.com/package/@domq-js/core) package:

    npm install --save @domq-js/core

That you can then use like this:

```javascript
import domq from "domq";

domq(function () {
  domq('html').addClass ( 'domq-works' );
  domq('<footer>Appended with domQ</footer>').appendTo ( document.body );
});
```

## [Documentation](https://domq.sva.wiki)
**domQ** gives you a query selector, `collection` methods and some `library` methods. If you need more details about our API just check out jQuery's, while we don't implement everything that jQuery provides, everything what we do implement should be compatible with jQuery. **domQ** can be extended with custom methods, read how [here](https://domq.sva.wiki/developer-guides/extending-domq).

### Documentation : https://domq.sva.wiki 

> ❤️ Thanks To [Mannatstudio Themes](https://github.com/mannatstudio-themes) For The Awesome Logo
---

## 📝 Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[Checkout CHANGELOG.md](/CHANGELOG.md)

## 🤝 Contributing
If you would like to help, please take a look at the list of [issues](issues/).

## 💰 Sponsor
[I][twitter] fell in love with open-source in 2013 and there has been no looking back since! You can read more about me [here][website].
If you, or your company, use any of my projects or like what I’m doing, kindly consider backing me. I'm in this for the long run.

- ☕ How about we get to know each other over coffee? Buy me a cup for just [**$9.99**][buymeacoffee]
- ☕️☕️ How about buying me just 2 cups of coffee each month? You can do that for as little as [**$9.99**][buymeacoffee]
- 🔰         We love bettering open-source projects. Support 1-hour of open-source maintenance for [**$24.99 one-time?**][paypal]
- 🚀         Love open-source tools? Me too! How about supporting one hour of open-source development for just [**$49.99 one-time ?**][paypal]

## 📜  License & Conduct
- [**MIT**](LICENSE) © [Varun Sridharan](website)
- [Code of Conduct](code-of-conduct.md)

## 📣 Feedback
- ⭐ This repository if this project helped you! :wink:
- Create An [🔧 Issue](issues/) if you need help / found a bug

## Connect & Say 👋
- **Follow** me on [👨‍💻 Github][github] and stay updated on free and open-source software
- **Follow** me on [🐦 Twitter][twitter] to get updates on my latest open source projects
- **Message** me on [📠 Telegram][telegram]
- **Follow** my pet on [Instagram][sofythelabrador] for some _dog-tastic_ updates!

---

<p align="center">
<i>Built With ♥ By <a href="https://sva.onl/twitter"  target="_blank" rel="noopener noreferrer">Varun Sridharan</a> 🇮🇳 </i>
</p>

---

<!-- Personl Links -->
[paypal]: https://sva.onl/paypal
[buymeacoffee]: https://sva.onl/buymeacoffee
[sofythelabrador]: https://www.instagram.com/sofythelabrador/
[github]: https://sva.onl/github/
[twitter]: https://sva.onl/twitter/
[telegram]: https://sva.onl/telegram/
[email]: https://sva.onl/email
[website]: https://sva.onl/website/
