<div align="center">
<!--   <img height="80" src="https://i.imgur.com/RcWoDL4.png"> -->
  <h1 align="center">NI Gatsby Themes</h1>
</div>

This repo contains [Gatsby](https://gatsbyjs.org) themes that we use to create the NI Design System website. In its most basic implementation, the theme provides a CSS reset, styles for regular HTML elements (`h1`, `h2`, `p`, `li`, etc.), and a handful of useful layout components.

Entirely built upon the fantastic [gatsby-theme-apollo](https://github.com/apollographql/gatsby-theme-apollo) from [Apollo](https://www.apollographql.com).

## Packages

- [`gatsby-theme-ni`](./packages/gatsby-theme-ni)
- [`gatsby-theme-ni-docs`](./packages/gatsby-theme-ni-docs)

## Basic usage

First, install `gatsby` and the theme that you want to use. This example will be using the base theme, `gatsby-theme-ni`.

```bash
$ npm install gatsby gatsby-theme-ni
```

Using a Gatsby theme is really easy! Simply configure your theme under the `__experimentalThemes` property in your Gatsby config. The only required option here is `root`, which should always be `__dirname`. It's also a good idea to give your site a `title` and `description`, as defined under the `siteMetadata` property in the config.

```js
// gatsby-config.js
module.exports = {
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-ni',
      options: {
        root: __dirname
      }
    }
  ],
  siteMetadata: {
    title: 'My great website',
    description: 'A simple Gatsby theme example'
  }
};
```

Now add some React components to your _src/pages_ directory, and you're off to the races! More info about creating pages in Gatsby [here](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/). Here's an example page:

```js
// src/pages/index.js
import React from 'react';
import {Layout, LogoTitle} from 'gatsby-theme-ni';

export default function Home() {
  return (
    <Layout>
      <LogoTitle />
      I love themes!
    </Layout>
  );
}
```

As you can see, the page is wrapped in a `Layout` component and contains a `LogoTitle`, both coming from `gatsby-theme-ni`. Our base theme has a bunch of useful shared components like these, and they're all documented [in the base theme](./packages/gatsby-theme-ni).

## Deploying to a subdirectory

In order to deploy a Gatsby site to a subdirectory, there are a few extra steps to take. First, you must provide a `pathPrefix` property in your Gatsby config. This option combined with the `--prefix-paths` option in the Gatsby CLI will handle most of the hard work. Read more about path prefixing in Gatsby [here](https://www.gatsbyjs.org/docs/path-prefix/).

```js
// gatsby-config.js
module.exports = {
  ...
  pathPrefix: '/YOUR_PATH_PREFIX'
};
```

Now, when you run `npx gatsby bulid --prefix-paths`, all pages, references to static assets, and links between pages will be prefixed with your custom path. That means that if you made a page with the path _/about_, it will live at _/**YOUR_PATH_PREFIX**/about_. In order for this to work within our server configuration, your website files also must exist in a directory with the same name. Here's how this sequence of events would look if you ran commands in your terminal:

```bash
$ npx gatsby build --prefix-paths
$ mkdir -p YOUR_PATH_PREFIX
$ mv public/* YOUR_PATH_PREFIX
$ mv YOUR_PATH_PREFIX public/
```
