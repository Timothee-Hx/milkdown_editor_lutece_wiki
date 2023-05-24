import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import {gfm} from '@milkdown/preset-gfm';
import '@milkdown/theme-nord/style.css';

import './style.css';

const el = document.querySelector('#wikicontent') as HTMLElement;
const content = el.dataset['content'] || '';

Editor
  .make()
  .config(ctx => {
    ctx.set(rootCtx, '#app')
    ctx.set(defaultValueCtx, content)
    ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
   let input =   document.getElementById('wiki_content') as HTMLInputElement;
   input.value = markdown;
  });
  })
  .config(nord)
  .use(commonmark)
  .use(gfm)
  .use(listener)
  .create()
