<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333333;
            margin: 0;
            padding: 30px 40px;
            background: #ffffff;
            line-height: 1.5;
          }
          a {
            color: #0b63ce;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .desc {
            font-size: 14px;
            color: #555555;
            margin: 0 0 12px;
          }
          .count {
            font-size: 13px;
            color: #666666;
            margin: 0 0 24px;
            font-weight: 500;
          }
          .table-container {
            width: 100%;
            overflow-x: auto;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            font-size: 13px;
            text-align: left;
          }
          th {
            border-bottom: 2px solid #0b63ce;
            padding: 12px 14px;
            font-weight: 700;
            color: #222222;
            font-size: 12px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          td {
            padding: 10px 14px;
            border-bottom: 1px solid #f0f0f0;
            word-break: break-all;
          }
          tr:nth-child(even) {
            background-color: #fafbfc;
          }
          tr:hover {
            background-color: #f1f6fc;
          }
          .priority, .changefreq {
            white-space: nowrap;
            color: #444444;
            font-variant-numeric: tabular-nums;
          }
          .high-priority {
            font-weight: 700;
            color: #0b63ce;
          }
        </style>
      </head>
      <body>
        <div id="content">
          <p class="desc">
            This is an XML Sitemap, meant for consumption by search engines. You can find more information about XML sitemaps on <a href="https://sitemaps.org" target="_blank" rel="noopener">sitemaps.org</a>.
          </p>
          <p class="count">
            This sitemap contains <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URLs.
          </p>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th width="70%">URL</th>
                  <th width="15%">PRIORITY</th>
                  <th width="15%">CHANGE FREQ</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td class="priority">
                      <xsl:choose>
                        <xsl:when test="sitemap:priority = '1.0'">
                          <span class="high-priority"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:otherwise>
                          <xsl:value-of select="sitemap:priority"/>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="changefreq">
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
