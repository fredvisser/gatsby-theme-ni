import NavItem from './nav-item';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {breakpoints} from 'gatsby-theme-ni';

const Container = styled.nav({
  display: 'flex',
  alignSelf: 'stretch',
  marginLeft: 'auto',
  paddingLeft: 40,
  [breakpoints.sm]: {
    display: 'none'
  }
});

const navConfig = {
  '/design-system': {
    text: 'Desktop',
  },
  '/design-system-web': {
    text: 'Web',
  },
};

function formatValue(value) {
  return value.startsWith('/')
    ? `https://fredvisser.github.io${value}`
    : value;
}

function generateSubpage([value, text]) {
  return {
    value,
    text
  };
}

function generateNavItems(config) {
  return Object.entries(config).map(
    ([value, {text, matchRegex, subpages}]) => ({
      text,
      value: formatValue(value),
      matchRegex,
      subpages: subpages && Object.entries(subpages).map(generateSubpage)
    })
  );
}

export const navItems = generateNavItems(navConfig);

export default function Nav(props) {
  return (
    <Container>
      {navItems.map(({value, text, matchRegex, subpages}) => {
        let isActive = matchRegex
          ? matchRegex.test(props.pathname)
          : props.isPathActive(value);
        if (!isActive && subpages) {
          isActive = subpages.some(subpage =>
            props.isPathActive(subpage.value)
          );
        }

        return (
          <NavItem
            key={value}
            href={formatValue(value)}
            subpages={subpages}
            active={isActive}
          >
            {text}
          </NavItem>
        );
      })}
    </Container>
  );
}

Nav.propTypes = {
  pathname: PropTypes.string.isRequired,
  isPathActive: PropTypes.func.isRequired
};
