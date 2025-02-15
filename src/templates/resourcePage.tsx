import { graphql } from "gatsby"
import React, { FC, Fragment } from "react"

import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Markdown } from "../components/Markdown"
import { PageContent } from "../components/PageContent"
import { SEO } from "../components/SEO"
import useSidebar from "../hooks/useSidebar"
import { buildToc } from "../utils"

// @todo maybe find alternative type for data
const ResourcePage: FC<any> = ({ data }) => {
  const { current: language } = useSidebar()
  const { relativePath } = data.file
  const {
    body,
    headings,
    excerpt,
    fields,
    frontmatter,
    timeToRead,
  } = data.file.post

  const toc = buildToc(headings)

  const shiftLayout = Boolean(
    frontmatter.recommended_reading ||
      frontmatter.external_resources ||
      toc.length
  )

  return (
    <Fragment>
      <SEO
        title={frontmatter.title}
        subCategory={language}
        description={excerpt}
      />
      <Header
        relativePath={relativePath}
        basePath="/resources"
        title={frontmatter.title}
        authors={fields.authors}
        createdAt={frontmatter.created_at}
        timeToRead={timeToRead}
        shifted={shiftLayout}
      />
      <PageContent
        content={
          <>
            <Markdown content={body} />
            <Footer />
          </>
        }
        toc={toc}
        recommendedReading={frontmatter.recommended_reading}
        externalResources={frontmatter.external_resources}
      />
    </Fragment>
  )
}

export default ResourcePage

export const query = graphql`
  query ResourcePage($file: String!) {
    file(relativePath: { eq: $file }) {
      relativePath
      post: childMdx {
        body
        headings {
          depth
          value
        }
        excerpt
        fields {
          authors {
            name
            hash
            avatar
          }
        }
        frontmatter {
          created_at
          title
          recommended_reading
          external_resources {
            text
            href
          }
        }
        timeToRead
      }
    }
  }
`
