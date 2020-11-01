$.extend($.expr[':'], {
    'containsi': function (elem, i, match, array) {
        return (elem.textContent || elem.innerText || '').toLowerCase()
            .indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

let sidebar = $('.sidebar');

let searchbox = sidebar.find('#searchbox');

searchbox.on('input', () => {
    let searchterm = searchbox.val();

    if (searchterm == '') {
        sidebar.attr('isFiltered', 'false');
        let matches = sidebar.find('label, a');
        matches.each((index, e) => {
            let item = $(e);
            check(item, searchterm);
        });
        $('.searchresult').removeClass('searchresult');
    } else {
        sidebar.attr('isFiltered', 'true');
        let matches = sidebar.find('label:containsi("' + searchterm + '"), a:containsi("' + searchterm + '")');
        let invalidMatches = sidebar.find(':not(label:containsi("' + searchterm + '")), :not(a:containsi("' + searchterm + '"))');

        $('.searchresult').removeClass('searchresult');

        invalidMatches.each((index, e) => {
            let item = $(e);
            uncheck(item);
        });

        matches.each((index, e) => {
            let item = $(e);
            check(item, searchterm);
            mark(item);
        });
    }

    function check(i, searchterm) {
        let item = $(i);

        if (item[0] == undefined) {
            return;
        }

        let checkbox = item.find('input[type="checkbox"]');
        checkbox.prop('checked', true);

        let parent = item.parent();

        check(parent.closest('.item'));
    }

    function uncheck(i) {
        let item = $(i);

        if (item[0] == undefined) {
            return;
        }

        let checkbox = item.find('input[type="checkbox"]');
        checkbox.prop('checked', false);

        let parent = item.parent();

        uncheck(parent.closest('.item'));
    }

    function mark(i) {
        let item = $(i);
        item.addClass('searchresult');
    }
});

let thisFile = window.location.pathname;

if(thisFile.endsWith('/')) {
    thisFile = thisFile + 'index.html';
}

if(thisFile.endsWith('.html')) {
    thisFile = thisFile.replace('.html', '');
}

console.log(thisFile);

$('a').filter(function() { return (this.href.endsWith(thisFile) || this.href.endsWith(thisFile + '.html') ) }).addClass('active');