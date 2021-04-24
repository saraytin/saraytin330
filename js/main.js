const links = [
    {
      label: "Week 1 Notes",
      url: "week1/index.html"
    }
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