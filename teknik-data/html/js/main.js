TD = {

    init: function(){
        TD.General.init();
    },

    General: {
        init: function(){
            TD.General.ModenizrElement.init();
            TD.General.CustomCheckBox.init();
        },
        ModenizrElement: {
            init: function(){                               
                if (!Modernizr.input.placeholder) {
                    $('[placeholder]').focus(function() {
                        var input = $(this);
                        if (input.val() == input.attr('placeholder')) {
                            input.val('');
                            input.removeClass('placeholder');
                        }
                    }).blur(function() {
                        var input = $(this);
                        if (input.val() == '' || input.val() == input.attr('placeholder')) {
                            input.addClass('placeholder');
                            input.val(input.attr('placeholder'));
                           }
                    }).blur();

                    $('[placeholder]').parents('form').submit(function() {
                        $(this).find('[placeholder]').each(function() {
                            var input = $(this);
                            if (input.val() == input.attr('placeholder')) {
                                input.val('');
                            }
                        })
                    });
                } 
            },
        }, 
        CustomCheckBox: {
            init: function(){                               
                var d = document;
                var safari = (navigator.userAgent.toLowerCase().indexOf('safari') != -1) ? true : false;
                var gebtn = function(parEl,child) { return parEl.getElementsByTagName(child); };
                onload = function() {
                    
                    var body = gebtn(d,'body')[0];
                    body.className = body.className && body.className != '' ? body.className + ' has-js' : 'has-js';
                    
                    if (!d.getElementById || !d.createTextNode) return;
                    var ls = gebtn(d,'label');
                    for (var i = 0; i < ls.length; i++) {
                        var l = ls[i];
                        if (l.className.indexOf('label_') == -1) continue;
                        var inp = gebtn(l,'input')[0];
                        if (l.className == 'label_check') {
                            l.className = (safari && inp.checked == true || inp.checked) ? 'label_check c_on' : 'label_check c_off';
                            l.onclick = check_it;
                        };
                        if (l.className == 'label_radio') {
                            l.className = (safari && inp.checked == true || inp.checked) ? 'label_radio r_on' : 'label_radio r_off';
                            l.onclick = turn_radio;
                        };
                    };
                };
                var check_it = function() {
                    var inp = gebtn(this,'input')[0];
                    if (this.className == 'label_check c_off' || (!safari && inp.checked)) {
                        this.className = 'label_check c_on';
                        if (safari) inp.click();
                    } else {
                        this.className = 'label_check c_off';
                        if (safari) inp.click();
                    };
                };
            },
        }, 
    }
}

TD.init();
