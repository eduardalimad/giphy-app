<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-lg">
      <q-card-section class="row items-center q-col-gutter-md">
        <AvatarUser />
        <div>
          <div class="text-h5">Sobre o Desenvolvedor</div>
          <div class="text-subtitle2 q-mt-xs">Informações do criador desta aplicação</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label class="text-subtitle1">
              <strong>Nome:</strong> Maria Eduarda Lima Duarte
            </q-item-label>

            <q-item-label caption class="q-mt-xs">
              <strong>Email:</strong>
              <a href="mailto:eduardalimad.dev@gmail.com" class="text-primary">
                eduardalimad.dev@gmail.com
              </a>
            </q-item-label>

            <q-item-label caption class="q-mt-sm">
              <strong>Sobre Mim:</strong>
              <div class="q-mt-xs">
                Sou formada em Análise e Desenvolvimento de Sistemas e atuo como Desenvolvedora
                Frontend com foco em aplicações web. Tenho especialização em
                <strong>Vue.js</strong>, experiência sólida com <strong>React.js</strong> e também
                desenvolvo aplicações mobile utilizando <strong>React Native</strong>.
              </div>
            </q-item-label>

            <div class="text-h6 q-mt-lg">Redes Sociais</div>
            <div class="row q-gutter-sm q-mt-sm">
              <q-btn
                v-for="link in links"
                :key="link.name"
                :color="link.color"
                unelevated
                rounded
                @click="openLink(link.url)"
              >
                <div class="row items-center no-wrap">
                  <img :src="link.icon" :alt="link.name" width="20" height="20" class="q-mr-sm" />
                  <span class="text-white">{{ link.name }}</span>
                </div>
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator spaced />

      <q-card-section>
        <div class="text-h6 q-mb-md">Stacks Utilizadas</div>
        <div class="row items-center q-col-gutter-md q-gutter-md">
          <img
            v-for="stack in stacks"
            :key="stack.name"
            :src="stack.icon"
            :alt="stack.name"
            width="40"
            height="40"
          />
        </div>
      </q-card-section>

      <q-separator spaced />

      <q-card-section>
        <div class="text-h6 q-mb-sm">Propósito do Teste</div>
        <p class="q-mt-sm">
          Este teste tem como objetivo principal avaliar conhecimentos práticos em
          <strong>Vue.js</strong> e <strong>Quasar Framework</strong>, com foco na criação de
          componentes reutilizáveis, estruturação de layouts modernos e apresentação de dados
          dinâmicos de forma clara e eficiente.
        </p>

        <p class="q-mt-sm">
          O projeto foi desenvolvido com uma stack moderna e robusta, incluindo:
        </p>
        <ul class="q-mt-sm q-ml-md">
          <li><strong>Vue.js</strong> – Framework progressivo para interfaces interativas</li>
          <li><strong>Quasar Framework</strong> – Criação de SPAs, SSRs e PWAs</li>
          <li><strong>Vue Router</strong> – Gerenciamento de rotas</li>
          <li><strong>Pinia</strong> – Gerenciamento de estado simples e eficiente</li>
          <li><strong>Local Storage</strong> – Armazenamento local de dados</li>
          <li><strong>Axios</strong> – Requisições HTTP para integração com APIs</li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import AvatarUser from '../components/AvatarUser.vue';
const openLink = (url: string) => {
  window.open(url, '_blank');
};
const links = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dev-eduarda-lima/',
    color: 'blue',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/eduardalimad',
    color: 'black',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  },
];
const stacks = [
  {
    name: 'Vue.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  },
  {
    name: 'Nuxt.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'HTML5',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS3',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    name: 'Sass',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  },
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'Yarn',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg',
  },
  {
    name: 'NPM',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
  },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  {
    name: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  },
];
</script>
