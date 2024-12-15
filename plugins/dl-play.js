import fetch from 'node-fetch';
const handler = async (m, {conn, command, args, text, usedPrefix}) => {
  if (!text) throw ` What song do you want to download `;
  try {
    const kyuu = await fetch(`https://api.agatz.xyz/api/ytsearch?message=${text}`);
    const tylor = await fetch(`https://api.agatz.xyz/api/ytmp3?url=${kyuu.data[0].url}`);
    await conn.sendMessage(
         m.chat,
         {
           audio: { url: tylor.data[0].downloadUrl },
           fileName: `${tylor.data[0].title}.mp3`,
           mimetype: "audio/mpeg",
           contextInfo: {
   externalAdReply: {
     title: `FIRE MD`,
     body: `${tylor.data[0].title}.mp3`,
     thumbnailUrl: `https://i.imgur.com/tStJm2M.jpeg`,
     sourceUrl: `${tylor.data[0].downloadUrl}`,
     mediaType: 2,
     showAdAttribution: true,
     renderLargerThumbnail: false
    }
   }
  }, { quoted: m });
 }
}

handler.help = ["play"];
handler.tags = ['downloader'];
handler.command = /^(play|mp3)$/i;
export default handler;
