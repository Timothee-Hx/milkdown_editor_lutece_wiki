import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import {gfm} from '@milkdown/preset-gfm';
import '@milkdown/theme-nord/style.css';
import { history, historyKeymap } from '@milkdown/plugin-history';
import { math } from '@milkdown/plugin-math';
import { diagram } from '@milkdown/plugin-diagram';
import { emoji } from '@milkdown/plugin-emoji';
import 'katex/dist/katex.min.css';
import './style.css';
import 'prism-themes/themes/prism-nord.css'
import { prism, prismConfig } from '@milkdown/plugin-prism';

import markdown from 'refractor/lang/markdown'
import css from 'refractor/lang/css'
import javascript from 'refractor/lang/javascript'
import typescript from 'refractor/lang/typescript'
import jsx from 'refractor/lang/jsx'
import tsx from 'refractor/lang/tsx'
import java from 'refractor/lang/java'
import json from 'refractor/lang/json'
import { cursor } from '@milkdown/plugin-cursor';
import { indent, indentConfig } from '@milkdown/plugin-indent';
import { trailing } from '@milkdown/plugin-trailing';

import { clipboard } from '@milkdown/plugin-clipboard';


const el = document.querySelector('#wikicontent') as HTMLElement;
//const content = el.dataset['content'] || 'zfzefezfezfzefze refezfzef zefezfezfez';
const content =  "Welcome to the Wiki powered by Lutece ===================================== This Wiki aims to be a very simple collaborative tool fully integrated to your Lutece site <br /> Key features {#H1_Key_features} ------------------------------- * Use standard Wikicreole syntax * Provide a very simple and efficient Wiki editor with removable Help panel * Can be easily customized by macros to add new rendering features (such as Bootstrap Jumbotron !) * Fully integrated to Lutece platform :   * Use MyLutece authentication and roles   * Compatible with Extend plugin and all its modules (comment, rating, hits, opengraph...)   * Support Lutece's avatar and pseudo features   * Use the graphical theme of the site. It will change the same way as all the site when the theme is modified.   * Code rendering skins can be managed into ''Site's properties'' ### Quick start {#H2_Quick_start} To create a new page, enter a link into an existing page (the page name in lower case with only underscores as extra characters) such as the link below : [my_new_page](jsp/site/Portal.jsp?page=wiki&action=newPage&parent_page_name=home&page_name=my_new_page ''Wikipedia link''). Then click on the link that appears in red (to be created) and edit your new page. You're done ! You will have also to create some roles for managing editing and deleting permissions and affect them to your users depending on which MyLutece module you are using. ### Quick rendering samples {#H2_Quick_rendering_samples} *Just click on Edit button to see the code of all this samples. All the syntax is available clicking on the Help button located at the top right corner.* This text use **bold** and *italics*. Various labels can be created, ex : Note Caution Awesome ... and badges : 256 A sample table (using all bootstrap features) :   edde |                                     URL                                     |     Description      | |-----------------------------------------------------------------------------|----------------------| | [http://fr.luteceparis.fr](http://fr.lutece.paris.fr)                       | Lutece Official Site | | [http://dev.luteceparis.fr/site-demo](http://dev.lutece.paris.fr/site-demo) | Demo site            | | [http://dev.luteceparis.fr/fr](http://dev.lutece.paris.fr/fr)               | OSS Site             | A block of code (using ''sunburst'' skin) : ``` language:c #include<stdio.h> main() {     printf(''Hello World''); } ``` Some alert boxes : : <br /> This is an info alert   This is an warning alert <br /> A table of content : * [Key features](http://localhost:8080/lutece/jsp/site/Portal.jsp#H1_Key_features)   * [Quick start](http://localhost:8080/lutece/jsp/site/Portal.jsp#H2_Quick_start)   * [Quick rendering samples](http://localhost:8080/lutece/jsp/site/Portal.jsp#H2_Quick_rendering_samples) A fixed size internal image aligned to the right : ![LUTECE logo](image?resource_type=wiki_image&id=1 ''LUTECE logo'') <p>Some awesome icons with different size <span class=''fa fa-check-circle'' ></span> <span class=''fa fa-cloud fa-3x'' ></span> <span class=''fa fa-cog fa-5x'' ></span></p>";


Editor
  .make()
  .config(ctx => {
    ctx.set(rootCtx, '#app')
    ctx.set(defaultValueCtx, content)
    ctx.set(historyKeymap.key, {
      // Remap to one shortcut.
      Undo: 'Mod-z',
      // Remap to multiple shortcuts.
      Redo: ['Mod-y', 'Shift-Mod-z'],
    });
    ctx.set(indentConfig, {
      type: 'space',
      size: 4,
    })
    ctx.set(prismConfig.key, {
      configureRefractor: (refractor) => {
        refractor.register(markdown)
        refractor.register(css)
        refractor.register(javascript)
        refractor.register(typescript)
        refractor.register(jsx)
        refractor.register(tsx)
        refractor.register(java)
        refractor.register(json)
      },
    });
    ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
 //  let input =   document.getElementById('wiki_content') as HTMLInputElement;
   //input.value = markdown;
   console.log(markdown);
  });
  })
  .config(nord)
  .use(commonmark)
  .use(gfm)
  .use(history)
  .use(listener)
  .use(math)
  .use(diagram)
  .use(emoji)
  .use(prism)
  .use(cursor)
  .use(indent)
  .use(trailing)
  .use(clipboard)
  .create()
