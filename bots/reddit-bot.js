const { Telegraf } = require('telegraf');
const axios = require('axios');

const channel = '@ondruiRedditNewPosts';
const botToken = '5416194275:AAHRsSW4WVSWlg3gPyzOsJNMtsCPGpe9p0o';

const startBot = () => {
  const redditBot = new Telegraf(botToken);
  redditBot.command('go', (ctx) => {
    //ctx.reply('Yo');
    getAndPost(ctx);
  });

  redditBot.launch();

  const getAndPost = (ctx) => {
    const url =
      'https://www.mos.ru/api/doctor-record/v1/doctors?appointmentId%5B0%5D=466447610023&omsNumber%5B0%5D=7792289788001374&birthDate%5B0%5D=2017-07-11';

    const cookie =
      'session-cookie=170b6efb5a79a2006ab83f6d6940ac7265b942c8a6525677cf38618ad670307d4f2204aa2cdd3a531aae58dfc5d89838; SL_G_WPT_TO=ru; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; PHPSESSID=lej5evv8d99j5b61vkssnjge4v; sbp_sid=000000000000000000000000000000000000; at=1; uxs_uid=e1fd70a0-1c5e-11ed-bd12-d15cf49848aa; ACS-SESSID=mbvhnj189cticr67epahh1cds0; mos_id=rBEAAmL6rX2qawAODegOAgA=; Ltpatoken2=HFUCpUTtugens7MTd4hNFv4oFUzO47WQ9aOVTxERtYRoEJTNS+Wm8BZLSt1EBv3auO8/rtISYOnasPEm7vg6UhW++2+hpr8NwXyUFLUVTO5w5izXW1bZzTNVDQxQtIXDwg6EFQ8Eco9dN4xKekZF7kNQuB7U+4WbobCqKePZrsc64Yuq2JUFcEK1FIsZT3l+oIdD7dCy8z3Qq/D6uE6v6TR2fqGugf+5kBrsEtjNxGWc62BAxLM5dRDrJQSUgRKlQLzCK0rsjz4QOwW6gG4ggC+Ewy1ln9LEY0ksy9EZom6/cvBMW7XC0gztJhN8fkvMoHi7f2Y8y4Z7HJSMOiLUOw==; acst=5b4QqBtxuO40eKZRzF9OaKt3Mnel8lA69XcHdFwyDzEyYjAzODk4Yy0xYmJhLTRlMjgtOGM4NS03NGE4MjU0ZjY3N2I';
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

    setInterval(() => {
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
    }, 60000);
  };

  // const postToChannel = (posts, ctx) => {
  //   posts.children.map((post, i) => {
  //     setTimeout(() => {
  //       ctx.telegram.sendPhoto(channel, post.data.url);
  //     }, 5000 * i);
  //   });
  // };
};

module.exports.startBot = startBot;
