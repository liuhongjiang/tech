---
layout: page
title: "标签分类"
---

<section>
  <p>查找：<input class="search" type="text" name="filter_tags" results="0" placeholder="Filter Tags ..."/></p>
  <script type="text/javascript">
    $('input[name=filter_tags]').keyup(function(e){
      var val = $(this).val();
      if (/^\s*$/.test(val) || e.keyCode == 27) { // 27 is 'esc'
        $('#category-list li').show();
        $(this).val('');
        return;
      }
      var pattern = new RegExp(val, 'i');
      $('#category-list li').each(function(){
        $(this)[pattern.test($(this).find('a').text()) ? 'show' : 'hide']();
      });
    });
  </script>
  <ul id="category-list">{% category_list counter:true %}</ul>
</section>
