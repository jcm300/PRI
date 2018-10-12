<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <title>AMD</title>
                </head>
                <body>
                    <h1>Arquivo de Música Digital</h1>
                    <hr/>
                    <ul>
                        <xsl:apply-templates select="//tipo[not(preceding::tipo=.)]"> <!--evita tipos repetidos-->
                            <xsl:sort select="."/> <!--sort por tipo-->
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>
        </xsl:result-document>
        <!--Gerar paginas individuais-->
        <xsl:apply-templates select="//obra" mode="obra"/>
    </xsl:template>
    
    <!--pagina do indice-->
    <xsl:template match="tipo">
        <xsl:variable name="t" select="."/> <!--variaveis constantes-->
        <li>
            <b><xsl:value-of select="."/></b>
            <ol>
                <xsl:for-each select="/arquivo-musical/obra[tipo=$t]">
                    <xsl:sort select="titulo"/>
                    <li>
                        <a href="obra?id={@id}"><xsl:value-of select="titulo"/></a>
                    </li>
                </xsl:for-each>
            </ol>
        </li>
    </xsl:template>
    
    <!--geraçao das paginas individuais-->
    <xsl:template match="obra" mode="obra">
        <xsl:result-document href="website/obra{@id}.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1><xsl:value-of select="titulo"/></h1>
                    <h2><xsl:value-of select="tipo"/></h2>
                    <xsl:if test="compositor">
                        <p><b>Compositor: </b><xsl:value-of select="compositor"/></p>
                    </xsl:if>
                    <xsl:if test="arranjo">
                        <p><b>Arranjo de: </b><xsl:value-of select="arranjo"/></p>
                    </xsl:if>
                    <xsl:if test="instrumentos/instrumento">
                        <h3>Partituras disponíveis</h3>
                        <table border="1">
                            <tr>
                                <th>Instrumento</th><th>Afinação</th><th>Voz</th><th>Clave</th><th>Documento</th>
                            </tr>
                            <xsl:for-each select="instrumentos/instrumento">
                                <tr>
                                    <td><xsl:value-of select="designacao"/></td>
                                    <td><xsl:value-of select="partitura/@afinacao"/></td>
                                    <td><xsl:value-of select="partitura/@voz"/></td>
                                    <td><xsl:value-of select="partitura/@clave"/></td>
                                    <td><xsl:value-of select="partitura/@path"/></td>
                                </tr>
                            </xsl:for-each>
                        </table>
                    </xsl:if>
                    <h6>[<a href="index.html">Voltar à pagina principal</a>]</h6>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
</xsl:stylesheet>
