import React from 'react'
import numeral from 'numeral'
import styled from '@emotion/styled'
import { GoMarkGithub, GoGitCommit } from 'react-icons/go'
import { MdGroup } from 'react-icons/md'

import { fromNow } from 'helpers/from-now'
import {
  Card,
  CardHeader,
  CardBody,
  CardSection,
  ExternalLink
} from 'components/core'
import { StarTotal } from 'components/core/project'

const formatNumber = number => numeral(number).format('0,0')

type Props = { project: BestOfJS.ProjectDetails }
export const GitHubRepoInfo = ({
  project: {
    full_name,
    repository,
    stars,
    created_at,
    pushed_at,
    contributor_count,
    commit_count
  }
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <GoMarkGithub size={20} className="icon" />
        <span style={{ marginRight: '0.5rem' }}>GITHUB REPOSITORY</span>
        <StarTotal value={stars} size={18} />
      </CardHeader>
      <CardBody>
        <CardSection>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1 1 0%' }}>
              <p>
                <ExternalLink url={repository}>{full_name}</ExternalLink>{' '}
              </p>
              {created_at && (
                <p>
                  Created {fromNow(created_at)}, last commit{' '}
                  {fromNow(pushed_at)}
                </p>
              )}
            </div>
            <div>
              <Stats>
                <MdGroup size={20} className="icon" />
                {formatNumber(contributor_count)} contributors
              </Stats>
              {commit_count && (
                <Stats>
                  <GoGitCommit size={20} className="icon" />
                  {formatNumber(commit_count)} commits
                </Stats>
              )}
            </div>
          </div>
        </CardSection>
      </CardBody>
    </Card>
  )
}

const Stats = styled.p`
  display: flex;
  align-items: center;
  .icon {
    margin-right: 0.5rem;
  }
`
