import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { GoMarkGithub } from 'react-icons/go'
import tinytime from 'tinytime'

import { useSelector } from 'containers/project-data-container'
import { fromNow } from 'helpers/from-now'
import { StaticContentContainer } from 'containers/static-content-container'
import { ExternalLinkIcon } from 'components/core/icons'

const template = tinytime('{H}:{mm}', { padHours: true })

export const Footer = () => {
  const lastUpdate = useSelector(state => state.meta.lastUpdate)
  const {
    repoURL,
    projectName,
    risingStarsURL,
    stateOfJSURL,
    version
  } = StaticContentContainer.useContainer()

  return (
    <StyledFooter id="footer">
      <div className="container">
        <Section>
          <div className="grid">
            <div>
              <Link to="/">
                <img
                  src="/images/logo.png"
                  alt="Best of JS logo"
                  width="100"
                  height="56"
                />
              </Link>
              <br />
              <br />
              <div className="v-center">
                <span className="ml-2">v{version}</span>
              </div>
            </div>
            <div>
              <LinkGroup title="DIRECT LINKS">
                <List>
                  <ListItem>
                    <DirectLink to="/projects">Projects</DirectLink>
                    All projects tracked by <i>{projectName}</i>
                  </ListItem>
                  <ListItem>
                    <DirectLink to="/tags">Tags</DirectLink>
                    The +180 tags manually picked to classify all projects
                  </ListItem>
                </List>
              </LinkGroup>
            </div>
            <div>
              <LinkGroup title="RELATED PROJECTS">
                <List>
                  <ListItem>
                    <ListItemLink href={stateOfJSURL}>
                      State of JS
                      <ExternalLinkIcon />
                    </ListItemLink>
                    <p>The biggest annual JavaScript-specific survey</p>
                  </ListItem>
                </List>
              </LinkGroup>
            </div>
          </div>
        </Section>
        <Separator />
        <Section className="footer-bottom">
          {lastUpdate && (
            <p>
              Data is updated from GitHub everyday, the last update was{' '}
              {fromNow(lastUpdate)} (at {template.render(lastUpdate)}).
            </p>
          )}
          <i>{projectName}</i>
          {/* <Partner>
            <span>Powered by</span>
            <a href="https://vercel.com?utm_source=bestofjs">
              <img width="80" src="/svg/vercel.svg" alt="Vercel" />
            </a>
          </Partner> */}
        </Section>
      </div>
    </StyledFooter>
  )
}

const breakPointColumns = 800

const StyledFooter = styled.footer`
  margin-top: 4rem;
  background-color: #1e9071;
  color: hsla(0, 0%, 100%, 0.7);
  .container {
    max-width: 1100px;
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
  a {
    color: #fbf3ef;
    font-family: var(--buttonFontFamily);
  }
  a:hover {
    text-decoration: underline;
  }
  .footer-bottom {
    text-align: center;
  }
  .grid {
    display: grid;
    grid-template-columns: 100px 1fr 1fr;
    grid-gap: 3rem;
    @media (max-width: ${breakPointColumns - 1}px) {
      grid-template-columns: none;
      grid-gap: 2rem;
      img {
        max-width: 300px;
      }
    }
  }
  &::after {
    content: '';
    display: block;
    height: 8px;
    width: 100%;
    background-image: linear-gradient(
      135deg,
      #ffe38c 20%,
      #ffae63 20% 40%,
      #f76d42 40% 60%,
      #d63c4a 60% 80%,
      #9c0042 80%
    );
  }
`

const Section = styled.section`
  p {
    margin-bottom: 1rem;
  }
`

const Separator = styled.hr`
  border-color: rgba(255, 255, 255, 0.3);
`

// const Partner = styled.p`
//   display: flex;
//   justify-content: center;
//   span {
//     margin-right: 4px;
//   }
// `

const LinkGroup = ({ title, children }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  )
}

const List = styled.ul`
  padding: 0;
  list-style: none;
`

const ListItem = styled.li`
  margin-bottom: 1rem;
  a {
    margin-bottom: 0.5rem;
  }
`

const ListItemLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 16px;
`

const DirectLink = ListItemLink.withComponent(Link)
