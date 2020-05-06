/**
 * Credits to https://codepen.io/0biwan for the htmlEncode function
 * Link: https://codepen.io/0biwan/pen/ggVemP
 */
function htmlEncode(value){
  return $('<div/>').text(value).html();
}

$(function(){
  $('#text-input').keyup(function(){
    let inputValue = $(this).val();

    const left = htmlEncode("<");  
    const right = htmlEncode(">");
    inputValue = inputValue.replace(/</gi, left);  
    inputValue = inputValue.replace(/>/gi, right);

    const preview = $('#preview-text');
    const previewRaw = $('#raw-preview-text');
    const defaultText = 'Text displays here...';

    const colorBreaks = inputValue.split(/(?=\&)/);
    const colorPairs = [];

    for (const val of colorBreaks) {
      const colorCode = val.substring(0, 2);
      const text = val.substring(2);
      
      switch (colorCode) {
        case '&0':
          colorPairs.push({ text, styles: { color: '#000000' } });
          break;
        case '&1':
          colorPairs.push({ text, styles: { color: '#0000AA' } });
          break;
        case '&2':
          colorPairs.push({ text, styles: { color: '#00AA00' } });
          break;
        case '&3':
          colorPairs.push({ text, styles: { color: '#00AAAA' } });
          break;
        case '&4':
          colorPairs.push({ text, styles: { color: '#AA0000' } });
          break;
        case '&5':
          colorPairs.push({ text, styles: { color: '#AA00AA' } });
          break;
        case '&6':
          colorPairs.push({ text, styles: { color: '#FFAA00' } });
          break;
        case '&7':
          colorPairs.push({ text, styles: { color: '#AAAAAA' } });
          break;
        case '&8':
          colorPairs.push({ text, styles: { color: '#555555' } });
          break;
        case '&9':
          colorPairs.push({ text, styles: { color: '#5555FF' } });
          break;
        case '&a':
          colorPairs.push({ text, styles: { color: '#55FF55' } });
          break;
        case '&b':
          colorPairs.push({ text, styles: { color: '#55FFFF' } });
          break;
        case '&c':
          colorPairs.push({ text, styles: { color: '#FF5555' } });
          break;
        case '&d':
          colorPairs.push({ text, styles: { color: '#FF55FF' } });
          break;
        case '&e':
          colorPairs.push({ text, styles: { color: '#FFFF55' } });
          break;
        case '&f':
          colorPairs.push({ text, styles: { color: '#FFFFFF' } });
          break;
        default:
          colorPairs.push({ text: val, styles: { color: '#000000' } });
          break;
      }
    }

    const finalPreview = colorPairs.map(({ text, styles }) => {
      let final = `<span>${text}</span>`;
      if (styles.hasOwnProperty('color')) final = `<span style='color:${styles.color}'>${text}</span>`;

      return final;
    });

    
    inputValue.length >= 1 ? previewRaw.text(inputValue) : previewRaw.text(defaultText);
    inputValue.length >= 1 ? preview.html(finalPreview.join('')) : preview.text(defaultText);
  });
});