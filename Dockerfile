# Build the Vite landing page
FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_APP_URL
ARG VITE_API_URL
# Add more ARGs here for other environment variables

# Set environment variables from build args
ENV VITE_APP_URL=${VITE_APP_URL}
ENV VITE_API_URL=${VITE_API_URL}

COPY package*.json ./
RUN npm ci

COPY vite.config.js ./
COPY pages ./pages
COPY public ./public
COPY src ./src

RUN npm run build

# Serve the generated static files with Nginx
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
