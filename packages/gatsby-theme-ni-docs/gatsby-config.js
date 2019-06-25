module.exports = ({
  subtitle,
  description,
  root,
  githubRepo,
  versions = {},
  checkLinksExceptions
}) => {
  const gatsbyRemarkPlugins = [
    'gatsby-remark-autolink-headers',
    {
      resolve: 'gatsby-remark-copy-linked-files',
      options: {
        ignoreFileExtensions: []
      }
    },
    {
      resolve: 'gatsby-remark-prismjs',
      options: {
        showLineNumbers: true
      }
    },
    {
      resolve: 'gatsby-remark-check-links',
      options: {
        exceptions: checkLinksExceptions
      }
    },
    {
      resolve: 'gatsby-remark-embedded-codesandbox',
      options: {
        directory: `${root}/source/`,
      }
    }
  ];

  return {
    __experimentalThemes: [
      {
        resolve: 'gatsby-theme-ni',
        options: {
          root
        }
      }
    ],
    siteMetadata: {
      title: 'NI Fuse Design System',
      subtitle,
      description
    },
    plugins: [
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `${root}/source`,
          name: 'docs'
        }
      },
      {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: gatsbyRemarkPlugins
        }
      },
      {
        resolve: 'gatsby-plugin-google-analytics',
        options: {
          trackingId: 'UA-74643563-13'
        }
      },
      {
        resolve: 'gatsby-mdx',
        options: {
          gatsbyRemarkPlugins
        }
      },
      ...Object.keys(versions).map(key => ({
        resolve: 'gatsby-source-git',
        options: {
          name: key,
          remote: `https://github.com/${githubRepo}`,
          branch: versions[key],
          patterns: 'apps/**'
        }
      }))
    ]
  };
};
