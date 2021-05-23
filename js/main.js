const links = [
  {
    label: 'Week 1 Notes',
    url: 'week1/',
  },
  {
    label: 'Week 2 Notes',
    url: 'week2/',
  },
  {
    label: 'Week 3 Notes',
    url: 'week3/',
  },
  {
    label: 'Week 4 Notes',
    url: 'week4/',
  },
  {
    label: 'Week 5 Notes',
    url: 'week5/',
  },
];

buildList();

function buildList() {
  var card = document.createElement('section');
  var list = document.createElement('ol');
  for (i = 0; i < links.length; i++) {
    let item = document.createElement('li');
    let link = document.createElement('a');
    link.setAttribute('href', links[i].url);
    link.textContent = links[i].label;
    item.appendChild(link);
    list.appendChild(item);
  }
  card.appendChild(list);
  document.querySelector('div#list').appendChild(card);
}
