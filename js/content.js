// Copy buttons
function addCopyBtn() {
  var divs = document.getElementsByClassName('top-matter');

  for (var i = 0; i < divs.length; i++) {
    var ul_lists = divs[i].getElementsByClassName('flat-list buttons');

    console.log(ul_lists[0].childNodes)

    var link = divs[i].getElementsByTagName('a');
    var li = document.createElement("li");
    var a = document.createElement("a");

    var str = "\"" + link[0].textContent + "\"" + " " + link[0].href

    a.textContent = "copy";
    a.setAttribute('id', 'copyBtn');
    a.setAttribute('class', 'copy');
    a.setAttribute('href', 'javascript:void(0);');

    var att = document.createAttribute('data-clipboard-text');
    att.value = str;
    a.setAttributeNode(att);

    li.appendChild(a);
    ul_lists[0].appendChild(li);
  }
}

addCopyBtn();

// Tooltip
$('.copy').tooltip({
  trigger: 'click',
  placement: 'right'
});

function setTooltip(btn, message) {
  $(btn).tooltip('hide')
    .attr('data-original-title', message)
    .tooltip('show');
}

function hideTooltip(btn) {
  setTimeout(function() {
    $(btn).tooltip('hide');
  }, 1000);
}

// Clipboard
var clipboard = new Clipboard('.copy');

clipboard.on('success', function(e) {
  console.info('Text:', e.text);
  setTooltip(e.trigger, 'Copied!');
  hideTooltip(e.trigger);
});

clipboard.on('error', function(e) {
  console.error('Text:', e.text);
  setTooltip(e.trigger, 'Failed!');
  hideTooltip(e.trigger);
});

document.body.addEventListener('DOMNodeInserted', function(event) {
  if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') && event.target.getAttribute('id').indexOf('siteTable') != -1)) {
    addCopyBtn();
  }
}, true);
