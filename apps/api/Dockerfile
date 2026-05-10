FROM node:20-alpine AS build
WORKDIR /app
COPY apps/api/package*.json ./
RUN npm install
COPY apps/api/ ./
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./
ENV NODE_ENV=production
EXPOSE 10000
CMD ["node", "dist/index.js"]
