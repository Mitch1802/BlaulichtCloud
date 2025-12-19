ARG PYTHON_VERSION=3.11.2-bullseye

FROM python:${PYTHON_VERSION} AS python

# =========================
# Build-Stage (Python Wheels)
# =========================
FROM python AS python-build-stage
ARG BUILD_ENVIRONMENT=production

RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential \
    libpq-dev \
    gettext netcat \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY ./django/requirements .
RUN pip wheel --wheel-dir /usr/src/app/wheels -r ${BUILD_ENVIRONMENT}.txt


# =========================
# Runtime-Stage
# =========================
FROM python AS python-run-stage
ARG BUILD_ENVIRONMENT=production
ARG APP_HOME=/app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV BUILD_ENV=${BUILD_ENVIRONMENT}

# Playwright Browser Pfad (lesbar für django User)
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Basis Tools + PostgreSQL Repo
RUN apt-get update && apt-get install -y wget ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt bullseye-pgdg main" \
    > /etc/apt/sources.list.d/pgdg.list'

# PostgreSQL Client
RUN apt-get update && apt-get install --no-install-recommends -y \
    postgresql-client-15 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV PATH="/usr/bin:/usr/lib/postgresql/bin:/usr/local/bin:$PATH"
WORKDIR ${APP_HOME}

# System User
RUN addgroup --system django && \
    adduser --system --ingroup django django

# App Verzeichnisse
RUN mkdir -p ${APP_HOME}/backups ${APP_HOME}/mediafiles /ms-playwright && \
    chown -R django:django ${APP_HOME} /ms-playwright && \
    chmod 775 ${APP_HOME}/backups ${APP_HOME}/mediafiles

# Python Wheels installieren
COPY --from=python-build-stage /usr/src/app/wheels /wheels/

RUN pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/* \
    && rm -rf /wheels/

# =========================
# Playwright + Chromium
# =========================
# --with-deps installiert ALLE nötigen OS Dependencies
RUN python -m playwright install --with-deps chromium \
    && chown -R django:django /ms-playwright

# Entrypoint & Start Scripts
COPY --chown=django:django ./docker/django/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint && chmod +x /entrypoint

COPY --chown=django:django ./docker/django/start /start
RUN sed -i 's/\r$//g' /start && chmod +x /start

# Django App
COPY --chown=django:django ./django ${APP_HOME}

USER django

ENTRYPOINT ["/entrypoint"]
