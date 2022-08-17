const { Telegraf } = require('telegraf');
const axios = require('axios');

const channel = '@ondruiRedditNewPosts';
const botToken = '5416194275:AAHRsSW4WVSWlg3gPyzOsJNMtsCPGpe9p0o';
let getReqId;

const startBot = () => {
  const redditBot = new Telegraf(botToken);
  redditBot.command('go', (ctx) => {
    //ctx.reply('Yo');
    getAndPost(ctx);
  });

  redditBot.command('stop', ctx => {
    clearInterval(getReqId);
  })

  redditBot.launch();

  const getAndPost = (ctx) => {
    const url =
      'https://www.mos.ru/api/doctor-record/v1/doctors?appointmentId%5B0%5D=466447610023&omsNumber%5B0%5D=7792289788001374&birthDate%5B0%5D=2017-07-11';

    const cookie =
      'SL_G_WPT_TO=ru; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; PHPSESSID=lej5evv8d99j5b61vkssnjge4v; sbp_sid=000000000000000000000000000000000000; at=1; uxs_uid=e1fd70a0-1c5e-11ed-bd12-d15cf49848aa; mos_id=rBEAAmL6rX2qawAODegOAgA=; session-cookie=170bbda08f0f2d566ab83f6d6940ac72118c6b8cbd6bb7dd2034b9f3bf49f13790000baa507e589a9c5091a637652697; ACS-SESSID=jh56j65t5m28ec4d9ng3dsni2a; Ltpatoken2=ITbeAvN8lAi84rkmUXqao694PlBAwsTp1NVpQlNexksaRTDvsUQKNIb+dMzA43WZd4z+mysBGbD69wkbWrqwiePYKBZnMdjQdGM0acSpzrzwJr2lHAbO3NAUCoMUOYf9G7yARhhz1zUZY0vD0J6IIBqqvtRY3tZBGqN8Tkwrk5P8N0w8RRDWEySj11XW+mjssHwOr2fzjOfj5BP4DIvhkR2atdrPxdjKBQfHHBH8JKWF7+7uH3ajx2AxkPbvpo+mDsF2lCjve9Xcc7mKMMEA2dTS3iSWcKZcNJRl/4P/EdSV1QyejC7nvFQiMGRo+MfWge1/gzb+umpcFjTGF+io6g==; acst=-72Qn1wdsjHqohUY9EPeFcyhQZEMCoMVTNzoBYTI9Io2NDIwZDdjZi0wMTg1LTQ2ZGUtOTRjOC1lYWJjOTAwNzUwMDE';
    let i = 1;

    var config = {
      method: 'get',
      url: url,
      headers: {
        Cookie: cookie,
      },
    };

    axios(config)
      .then(function (response) {
        const { list } = response.data.data;
        list.map((item) => {
          item.complex_resource[0].room
            ? ctx.reply(`${item.name} ${item.complex_resource}`)
            : ctx.reply(`${item.name} - no data!`);
        });
        setTimeout(() => {
          let now = new Date();
          ctx.reply(now);
          ctx.reply(`_____________ 0 __________________`);
        }, 500);
      })
      .catch(function (error) {
        console.log(error);
      });

    getReqId = setInterval(() => {
      axios(config)
        .then(function (response) {
          const { list } = response.data.data;
          list.map((item) => {
            item.complex_resource[0].room
              ? ctx.reply(`${item.name} ${item.complex_resource}`)
              : ctx.reply(`${item.name} - no data!`);
          });
          setTimeout(() => {
            let now = new Date();
            ctx.reply(now);
            ctx.reply(`_____________ ${i++} __________________`);
          }, 500);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, 100000);
  };
};

module.exports.startBot = startBot;
