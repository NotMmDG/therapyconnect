FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g tailwindcss postcss autoprefixer
COPY . .
RUN npm install --legacy-peer-deps tailwindcss postcss autoprefixer @tailwindcss/postcss postcss-loader postcss-import framer-motion @heroicons/react @shadcn/ui @fontsource/inter lottie-react @lottiefiles/react-lottie-player react-router-dom axios @react-oauth/google js-cookie
RUN echo "module.exports = { plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')] }" > postcss.config.js
RUN touch tailwind.config.js && echo "module.exports = { content: ['./src/**/*.{js,jsx,ts,tsx}'], theme: { extend: { fontFamily: { inter: ['Inter', 'sans-serif'] } } }, plugins: [], }" > tailwind.config.js
ENV HTTPS=true
ENV HTTP=true
CMD ["npm", "start"]
