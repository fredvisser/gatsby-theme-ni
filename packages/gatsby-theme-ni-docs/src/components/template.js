import '../prism.less';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import CodeBlock from './code-block';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import Nav, {navItems} from './nav';
import PageContent from './page-content';
import PageHeader from './page-header';
import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import SEO from './seo';
import Search from './search';
import SelectLink from './select-link';
import SidebarContent from './sidebar-content';
import rehypeReact from 'rehype-react';
import styled from '@emotion/styled';
import {
  ContentWrapper,
  DesktopHeader,
  FlexWrapper,
  Layout,
  LogoTitle,
  MenuButton,
  MobileHeader,
  ResponsiveSidebar,
  Sidebar
} from 'gatsby-theme-ni';
import {MDXProvider} from '@mdx-js/react';
import {TypescriptApiBoxContext} from './typescript-api-box';
import {graphql} from 'gatsby';

const StyledLogoTitle = styled(LogoTitle)({
  marginRight: 'auto'
});

const Main = styled.main({
  flexGrow: 1,
  outline: 'none',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch'
});

const StyledContentWrapper = styled(ContentWrapper)({
  paddingBottom: 0
});

const components = {
  pre: CodeBlock
};

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components
}).Compiler;

export default function Template(props) {
  const mainRef = useRef(null);

  function isPathActive(value) {
    return !props.location.pathname.indexOf(value);
  }

  const {hash, pathname} = props.location;
  const {file, site} = props.data;
  const {frontmatter, headings} = file.childMarkdownRemark || file.childMdx;
  const {title, description, subtitle} = site.siteMetadata;
  const {
    sidebarContents,
    githubUrl,
    typescriptApiBox,
    versions,
    defaultVersion
  } = props.pageContext;

  const pages = sidebarContents
    .reduce((acc, {pages}) => acc.concat(pages), [])
    .filter(page => !page.anchor);

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || description}
        siteName={title}
      />
      <ResponsiveSidebar>
        {({sidebarRef, onWrapperClick, openSidebar, sidebarOpen}) => (
          <FlexWrapper onClick={onWrapperClick}>
            <Sidebar
              responsive
              open={sidebarOpen}
              ref={sidebarRef}
              title={title}
            >
              <SidebarContent
                title={subtitle}
                pathname={pathname}
                contents={sidebarContents}
                versions={versions}
                defaultVersion={defaultVersion}
                isPathActive={isPathActive}
              />
            </Sidebar>
            <Main ref={mainRef} tabIndex={0}>
              <MobileHeader>
                <MenuButton onClick={openSidebar} />
                <StyledLogoTitle />
                <SelectLink
                  large
                  options={navItems}
                  isPathActive={isPathActive}
                />
              </MobileHeader>
              <DesktopHeader>
                <Search />
                <Nav pathname={pathname} isPathActive={isPathActive} />
              </DesktopHeader>
              <StyledContentWrapper>
                <PageHeader {...frontmatter} />
                <hr />
                <PageContent
                  pathname={pathname}
                  pages={pages}
                  headings={headings}
                  hash={hash}
                  githubUrl={githubUrl}
                  mainRef={mainRef}
                >
                  {file.childMdx ? (
                    <TypescriptApiBoxContext.Provider value={typescriptApiBox}>
                      <MDXProvider components={components}>
                        <MDXRenderer>{file.childMdx.code.body}</MDXRenderer>
                      </MDXProvider>
                    </TypescriptApiBoxContext.Provider>
                  ) : (
                    renderAst(file.childMarkdownRemark.htmlAst)
                  )}
                </PageContent>
              </StyledContentWrapper>
            </Main>
          </FlexWrapper>
        )}
      </ResponsiveSidebar>
    </Layout>
  );
}

Template.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query PageQuery($id: String) {
    site {
      siteMetadata {
        title
        description
        subtitle
      }
    }
    file(id: {eq: $id}) {
      childMarkdownRemark {
        frontmatter {
          title
          description
        }
        headings(depth: h2) {
          value
        }
        htmlAst
      }
      childMdx {
        frontmatter {
          title
          description
        }
        headings(depth: h2) {
          value
        }
        code {
          body
        }
      }
    }
  }
`;
