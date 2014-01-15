(function($) {

    $.tresDropDown = function(options){
        var extendDefault = $.extend({}, $.tresDropDown.defaults, options);
        $.createStructure(extendDefault);
    };

    $.createStructure = function(extendDefault){

        var selector = $(extendDefault.selector);
        var selectorLength = selector.length;

        if(selectorLength == 1){

            selector.addClass('tres-customDropDown-style');

            if(extendDefault.animate){
                selector.children('.hiddenDiv').attr('data-anim','true');
                selector.children('.hiddenDiv').attr('data-animspeed',extendDefault.animateSpeed);
                selector.children('.hiddenDiv').attr('data-height',extendDefault.height);
            }

            if(extendDefault.activeClass)
                selector.children('.hiddenDiv').attr('data-active','true');

            if(!extendDefault.autoDraggerLength){
                selector.children('.hiddenDiv').attr('data-arrow','false');
            }
            if(extendDefault.labelActive){
                selector.children('.hiddenDiv').attr('data-label-active','true');
            }

            if(!extendDefault.scrollSelector)
                selector.children('.hiddenDiv').attr('data-scroll','false');

            if(extendDefault.lastClass)
                $(extendDefault.selector + ' li:last').addClass(extendDefault.lastClass);

        }else{
            for(var j = 0; selectorLength > j;j++)
            {
                $(selector[j]).addClass('tres-customDropDown-style');


                if(extendDefault.animate){
                    $(selector[j]).children('.hiddenDiv').attr('data-anim','true');
                    $(selector[j]).children('.hiddenDiv').attr('data-animspeed',extendDefault.animateSpeed);
                    $(selector[j]).children('.hiddenDiv').attr('data-height',extendDefault.height);
                }
                if(extendDefault.activeClass)
                    $(selector[j]).children('.hiddenDiv').attr('data-active','true');;

                if(!extendDefault.scrollSelector)
                    $(selector[j]).children('.hiddenDiv').attr('data-scroll','false');

                if(!extendDefault.autoDraggerLength){
                    $(selector[j]).children('.hiddenDiv').attr('data-arrow','false');
                }
                if(extendDefault.labelActive){
                    $(selector[j]).children('.hiddenDiv').attr('data-label-active','true');
                }

                if(extendDefault.lastClass){
                    $(selector[j]).children('.hiddenDiv').children('ul').children('li:last').addClass(extendDefault.lastClass);
                }

            }


        }
        selector.removeClass('visualHidden');
        $(extendDefault.selector + ' label').bind('click', $.tresDropDown.open);
        $('html').bind('click', $.tresDropDown.close);
        $(document).bind('keypress', $.tresDropDown.keyWatch);
        $(document).on('click', extendDefault.selector + ' .hiddenDiv li' , $.tresDropDown.chose);

    };

    $.tresDropDown.open = function(){


        var th = $(this).siblings('.hiddenDiv');

        if(th.parent().hasClass('active'))
        {
            $.tresDropDown.clear();
            return false;
        }
        $.tresDropDown.clear();

        if(th.attr('data-anim')){
            var animateSpeed = parseInt(th.attr('data-animspeed'));
            var heightDiv = parseInt(th.attr('data-height'));
            th.animate({height : heightDiv },animateSpeed);
        }else
            th.addClass('active');

        if(th.attr('data-scroll') == null){
            var arrow = true;
            if(th.attr('data-arrow') != null)
                arrow = false;
            th.mCustomScrollbar("destroy");
            th.mCustomScrollbar({
                autoDraggerLength : arrow
            });
        }
        if(th.attr('data-active')){
            th.parent('div').addClass('active');
        }

        if(th.attr('data-label-active'))
        {
            th.siblings('label').addClass('active');
        }

        return false;
    };

    $.tresDropDown.chose = function(){

        var th = $(this).parents('.hiddenDiv');

        th.siblings('label').children('span.tres-dropDownSpan').html($(this).html());
        th.siblings('input[type=hidden]').val($(this).attr('data-id'));
        th.siblings('input[type=hidden]').trigger('change');

        if(th.attr('data-anim')){
            var animateSpeed = parseInt(th.attr('data-animspeed'));
            th.animate({height : 0 },animateSpeed);
        }else
            th.removeClass('active');

        if(th.attr('data-active')){
            th.parent('div').removeClass('active');
        }
        if(th.attr('data-label-active'))
            th.siblings('label').removeClass('active');

    };

    $.tresDropDown.clear = function(){
        var selector  = $($.tresDropDown.contains.defaultSelector);
        var selectorLength = selector.length;
        if(selectorLength> 0){
            for(var j = 0; selectorLength > j; j++){

                if($(selector[j]).children('.hiddenDiv').attr('data-anim')){
                    $(selector[j]).children('.hiddenDiv').animate({height : 0 },$(selector[j]).children('.hiddenDiv').attr('data-animspeed'));
                } else {
                    $(selector[j]).children('.hiddenDiv').removeClass('active');
                }

                if($(selector[j]).children('.hiddenDiv').attr('data-active')){
                    $(selector[j]).children('.hiddenDiv').parent('div').removeClass('active');
                }
                if($(selector[j]).children('.hiddenDiv').attr('data-label-active'))
                    $(selector[j]).children('.hiddenDiv').siblings('label').removeClass('active');


            }
        }else{
            if(selector.children('.hiddenDiv').attr('data-anim')){
                selector.children('.hiddenDiv').animate({height : 0 },selector.children('.hiddenDiv').attr('data-animspeed'));
            }else{
                selector.children('.hiddenDiv').removeClass('active');
            }
            if(selector.children('.hiddenDiv').attr('data-label-active'))
                selector.children('.hiddenDiv').siblings('label').removeClass('active');

        }

        $.tresDropDown.contains.lastIndex = -1;
        $.tresDropDown.contains.firstSelect = false;
        $.tresDropDown.contains.lastCharacter = '';
    }

    $.tresDropDown.close = function(e){
        if (!$(e.target).is($.tresDropDown.defaults.selector) && !$(e.target).is($.tresDropDown.defaults.selector +' *'))
        {
            $.tresDropDown.clear();
        }
    };

    $.tresDropDown.keyWatch = function(e){

        var index = -1;
        var count = 0;

        $('.hiddenDiv.active ul li').each(function(){
            var th = $(this);
            if(th.html().substring(0,1).trLowerCase() == String.fromCharCode(e.which).trLowerCase()){
                if(!th.hasClass('active')){

                    if(!$.tresDropDown.contains.firstSelect){
                        $('.hiddenDiv.active ul li').removeClass('active');
                        th.addClass('active');
                        $.tresDropDown.contains.firstSelect = true;
                        index = th.index();
                        th.parents('.hiddenDiv').siblings('label').children('span.tres-dropDownSpan').html($(this).html());
                        th.parents('.hiddenDiv').siblings('input[type=hidden]').val($(this).attr('data-id'));
                    }

                    if($.tresDropDown.contains.lastIndex <th.index() || $.tresDropDown.contains.lastCharacter.trLowerCase() != String.fromCharCode(e.which).trLowerCase())
                    {
                        $('.hiddenDiv.active ul li').removeClass('active');
                        th.addClass('active');
                        $.tresDropDown.contains.lastIndex = th.index();
                        $.tresDropDown.contains.lastCharacter = String.fromCharCode(e.which).trLowerCase();
                        $.tresDropDown.contains.firstSelect = false;
                        th.parents('.hiddenDiv').siblings('label').children('span.tres-dropDownSpan').html($(this).html());
                        th.parents('.hiddenDiv').siblings('input[type=hidden]').val($(this).attr('data-id'));
                        count++;
                        return false;
                    }

                }
            }
        });

        if(count == 0){
            $.tresDropDown.contains.firstSelect = false;
            $.tresDropDown.contains.lastIndex = index;
        }

        if($.tresDropDown.contains.lastIndex != 0){
            var calHeight = 0;
            var containerHeight = parseInt($('.hiddenDiv.active .mCSB_container').css('height'));
            var scrollBoxHeight = parseInt($('.hiddenDiv.active .mCustomScrollBox').css('height'));
            var rate =  scrollBoxHeight / containerHeight;
            var maxTop = containerHeight - scrollBoxHeight;
            var liSelector  = $('.hiddenDiv.active .mCSB_container > ul > li');
            var totalMargin = 0;

            if(!isNaN(parseInt(liSelector.css('margin-top'))))
                totalMargin += parseInt(liSelector.css('margin-top'));

            if(!isNaN(parseInt(liSelector.css('margin-bottom'))))
                totalMargin += parseInt(liSelector.css('margin-bottom'));

            if(!isNaN(parseInt(liSelector.css('padding-top'))))
                totalMargin += parseInt(liSelector.css('padding-top'));

            if(!isNaN(parseInt(liSelector.css('padding-bottom'))))
                totalMargin += parseInt(liSelector.css('padding-bottom'));

            for(var a = 0; $.tresDropDown.contains.lastIndex > a; a++){
                calHeight += parseInt($(liSelector[a]).css('height')) + totalMargin;
            }

            if(calHeight < maxTop){
                $('.hiddenDiv.active  .mCSB_container').animate({top :  -1 * calHeight},300);
                $('.hiddenDiv.active  .mCSB_dragger').animate({top : calHeight * rate},300);
            } else {
                var maxHeightButton = parseInt($('.hiddenDiv.active  .mCSB_draggerContainer').css('height')) -  parseInt($('.hiddenDiv.active .mCSB_dragger').css('height'));
                $('.hiddenDiv.active  .mCSB_container').animate({top :  -1 * maxTop},300);
                $('.hiddenDiv.active  .mCSB_dragger').animate({top : maxHeightButton},300);
            }
        } else {
            $('.hiddenDiv.active  .mCSB_container').animate({top : 0},300);
            $('.hiddenDiv.active  .mCSB_dragger').animate({top : 0},300);
        }

    };





    $.tresDropDown.defaults = {
        message             : '--seçiniz--',       /// Labeldaki Ä°nlk Andaki Mesaj
        animate             : false,                // Menu AnimasyonlamÄ± AcÄ±lacak
        targetAttr          : 'data-id',            // hidden inputun valusunu alÄ±cagÄ± li attributu
        linkAttr            : 'data-url',           // Redirect olacaksa hangi atribute uzerinden olacak
        inputName           : false,                // eÄŸer input name veririse  mevcut inputu siler ve yerine yenisini basar
        selector            : '.tres-customDropDown', // default selector
        scrollSelector      : '.scroll-drop-down',  // default atanacak scroll iÃ§in selector (mCustomScrollBar Pluginiyle Ã‡alÄ±ÅŸÄ±r)
        autoSelect          : false,                // 0 1 2 3 gibi int deÄŸerler bu deÄŸer listedeki durumun lindexine gore atanÄ±r...
        height              : 250,                  // Animate durumunda acÄ±lacak yÃ¼kseklik
        activeClass         : true,
        lastClass           : true,
        autoDraggerLength   : true,
        labelActive         : false,
        animateSpeed        : 1500,
        autoComplete        : false


    };

    $.tresDropDown.contains = {
        lastIndex             : -1,
        lastCharacter         : '',
        firstSelect           : false,
        defaultSelector       : '.tres-customDropDown-style'
    };


})(jQuery);