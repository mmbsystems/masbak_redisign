import {chromium} from '@playwright/test';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:1000}});await p.goto('http://127.0.0.1:3100',{waitUntil:'networkidle'});await p.screenshot({path:'test-results/hero-desktop.png'});await p.setViewportSize({width:390,height:844});await p.screenshot({path:'test-results/hero-mobile.png'});await b.close();
