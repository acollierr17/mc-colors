/**
 * Credits to https://codepen.io/0biwan for some of the functions and RegExp for color parsing
 * Link: https://codepen.io/0biwan/pen/ggVemP
 */
function htmlEncode(value){
  return $('<div/>').text(value).html();
}

setInterval(function() {
  $('.obfuscated').text(randomizer($('.obfuscated').text()));
}, 40);

function randomizer(rawr) {
  const length = rawr.length;
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i=0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

/**
 * Credits to https://codepen.io/shaikmaqsood/ for the copyToClipboard function
 * Link: https://codepen.io/shaikmaqsood/pen/XmydxJ
 */
function copyToClipboard(element, tag) {
  const $temp = $('<input>');
  $('body').append($temp);

  $temp.val($(element).ignore('span').text()).select();
  document.execCommand('copy');
  $temp.remove();

  $(tag)
    .text('Copied to clipboard!')
    .removeClass('is-danger')
    .addClass('is-success');
    
}

/** 
 * Credits to https://stackoverflow.com/users/383904/roko-c-buljan for the ignore jQuery function
 * Link: https://stackoverflow.com/a/11348383/10804092
 */

$.fn.ignore = function(sel) {
  return this.clone().find(sel||'>*').remove().end();
}

$(function(){
  $('#raw-preview-text').hover(function(){
    $(this).append($('<span id="raw-preview-text-copy" class="tag is-danger is-light">Click to copy</span>'));
  }, function() {
    $(this).find('#raw-preview-text-copy').remove();
  });

  $('#preview-text').hover(function(){
    $(this).append($('<span id="preview-text-copy" class="tag is-danger is-light">Click to copy</span>'));
  }, function() {
    $(this).find('#preview-text-copy').remove();
  });

  $('#text-input').keyup(function(){
    let inputValue = $(this).val();

    // parsing to prevent XSS
    const left = htmlEncode("<");  
    const right = htmlEncode(">");
    inputValue = inputValue.replace(/</gi, left);  
    inputValue = inputValue.replace(/>/gi, right);

    const inputRaw = inputValue;

    const preview = $('#preview-text');
    const previewRaw = $('#raw-preview-text');
    const defaultText = 'Text displays here...';

    // new line
    inputValue = inputValue.replace(/\n/gi, '&r<br />');

    // colors
    inputValue = inputValue.replace(/&0|\\u00A70/gi, '</span>&r<span style="color:#000000">');
    inputValue = inputValue.replace(/&1|\\u00A71/gi, '</span>&r<span style="color:#0000AA">');
    inputValue = inputValue.replace(/&2|\\u00A72/gi, '</span>&r<span style="color:#00AA00">');
    inputValue = inputValue.replace(/&3|\\u00A73/gi, '</span>&r<span style="color:#00AAAA">');
    inputValue = inputValue.replace(/&4|\\u00A74/gi, '</span>&r<span style="color:#AA0000">');
    inputValue = inputValue.replace(/&5|\\u00A75/gi, '</span>&r<span style="color:#AA00AA">');
    inputValue = inputValue.replace(/&6|\\u00A76/gi, '</span>&r<span style="color:#FFAA00">');
    inputValue = inputValue.replace(/&7|\\u00A77/gi, '</span>&r<span style="color:#AAAAAA">');
    inputValue = inputValue.replace(/&8|\\u00A78/gi, '</span>&r<span style="color:#555555">');
    inputValue = inputValue.replace(/&9|\\u00A79/gi, '</span>&r<span style="color:#5555FF">');
    inputValue = inputValue.replace(/&a|\\u00A7a/gi, '</span>&r<span style="color:#55FF55">');
    inputValue = inputValue.replace(/&b|\\u00A7b/gi, '</span>&r<span style="color:#55FFFF">');
    inputValue = inputValue.replace(/&c|\\u00A7c/gi, '</span>&r<span style="color:#FF5555">');
    inputValue = inputValue.replace(/&d|\\u00A7d/gi, '</span>&r<span style="color:#FF55FF">');
    inputValue = inputValue.replace(/&e|\\u00A7e/gi, '</span>&r<span style="color:#FFFF55">');
    inputValue = inputValue.replace(/&f|\\u00A7f/gi, '</span>&r<span style="color:#FFFFFF">');

    // formatting
    // bold
    inputValue = inputValue.replace(/&l|\\u00A7l/gi, '<span style="font-weight:900;">');
    // italic
    inputValue = inputValue.replace(/&o|\\u00A7o/gi, '<span style="font-style:italic;">');
    // strikethrough
    inputValue = inputValue.replace(/&m|\\u00A7m/gi, '<span style="text-decoration:line-through;">');
    // underlined
    inputValue = inputValue.replace(/&n|\\u00A7n/gi, '<span style="text-decoration:underline">');
    // obfuscated
    inputValue = inputValue.replace(/&k|\\u00A7k/gi, '<span class="obfuscated">');
    // reset
    inputValue = inputValue.replace(/&r|\\u00A7r/gi, "</span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span></span>");

    inputValue.length >= 1 ? previewRaw.text(inputRaw) : previewRaw.text(defaultText);
    inputValue.length >= 1 ? preview.html(inputValue) : preview.text(defaultText);
  });
});
