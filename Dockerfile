FROM node:18-alpine
RUN apk update && apk upgrade && \
    apk add --no-cache bash git yarn python3 make g++  && \
    yarn global add gatsby-cli && \
    yarn add styled-components \ 
    gatsby-plugin-styled-components \
    babel-plugin-styled-components \
    gatsby-plugin-root-import \
    phosphor-react \
    gatsby-plugin-manifest

EXPOSE 8000