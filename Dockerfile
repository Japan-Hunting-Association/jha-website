# Dockerfile.base（1回だけビルドしてDocker Hubにpush）
FROM node:20-bookworm-slim
WORKDIR /app

# Install necessary packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends openssh-client git curl python3 python3-pip && \
    rm -rf /var/lib/apt/lists/*

# Install GitHub CLI (detect architecture)
RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "x86_64" ]; then \
        GITHUB_CLI_ARCH="amd64"; \
    elif [ "$ARCH" = "aarch64" ]; then \
        GITHUB_CLI_ARCH="arm64"; \
    else \
        GITHUB_CLI_ARCH="amd64"; \
    fi && \
    curl -fsSL https://github.com/cli/cli/releases/download/v2.74.2/gh_2.74.2_linux_${GITHUB_CLI_ARCH}.tar.gz | tar -xz -C /tmp && \
    mv /tmp/gh_2.74.2_linux_${GITHUB_CLI_ARCH}/bin/gh /usr/local/bin/ && \
    rm -rf /tmp/gh_2.74.2_linux_${GITHUB_CLI_ARCH}

# Install Claude Code CLI globally
RUN npm install -g @anthropic-ai/claude-code

# uvバイナリをコピー
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# SSH directory setup
RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh

EXPOSE 4321