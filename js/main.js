!function(m,t,e,a){m.extend(m.fn,{accrue:function(r){return r=m.extend({calculationMethod:o},m.fn.accrue.options,r),this.each(function(){var e=m(this);e.find(".form").length||e.append('<div class="form"></div>');c(e,r,"amount"),c(e,r,"rate"),c(e,r,"term");if("compare"==r.mode)c(e,r,"rate_compare");if(".results"===r.response_output_div){0==e.find(".results").length&&e.append('<div class="results"></div>');var a=e.find(".results")}else a=m(r.response_output_div);switch(r.mode){case"basic":var n=o;break;case"compare":n=i;break;case"amortization":n=s}n(e,r,a),"button"==r.operation?(0==e.find("button").length&&e.find(".form").append('<button class="accrue-calculate">'+r.button_label+"</button>"),e.find("button, input[type=submit]").each(function(){m(this).click(function(t){t.preventDefault(),n(e,r,a)})})):e.find("input, select").each(function(){m(this).bind("keyup change",function(){n(e,r,a)})}),e.find("form").each(function(){m(this).submit(function(t){t.preventDefault(),n(e,r,a)})})})}}),m.fn.accrue.options={mode:"basic",operation:"keyup",default_values:{amount:"$7,500",rate:"7%",rate_compare:"1.49%",term:"36m"},field_titles:{amount:"Loan Amount",rate:"Rate (APR)",rate_compare:"Comparison Rate",term:"Term"},button_label:"Calculate",field_comments:{amount:"",rate:"",rate_compare:"",term:"Format: 12m, 36m, 3y, 7y"},response_output_div:".results",response_basic:"<p><strong>Monthly Payment:</strong><br />$%payment_amount%</p><p><strong>Number of Payments:</strong><br />%num_payments%</p><p><strong>Total Payments:</strong><br />$%total_payments%</p><p><strong>Total Interest:</strong><br />$%total_interest%</p>",response_compare:"Save $%savings% in interest!",error_text:"Please fill in all fields.",callback:function(t,e){}};var c=function(t,e,a){var n=t.find("."+a).length?t.find("."+a):t.find(".accrue-"+a).length?t.find(".accrue-"+a):t.find("input[name~="+a+"]").length?t.find("input[name~="+a+"]"):"";return"string"!=typeof n?n.val():"term_compare"!=a&&(t.find(".form").append('<div class="accrue-field-'+a+'"><p><label>'+e.field_titles[a]+':</label><input type="text" class="'+a+'" value="'+e.default_values[a]+'" />'+(0<e.field_comments[a].length?"<small>"+e.field_comments[a]+"</small>":"")+"</p></div>"),t.find("."+a).val())},o=function(t,e,a){var n=m.loanInfo({amount:c(t,e,"amount"),rate:c(t,e,"rate"),term:c(t,e,"term")});if(0!==n){var r=e.response_basic.replace("%payment_amount%",n.payment_amount_formatted).replace("%num_payments%",n.num_payments).replace("%total_payments%",n.total_payments_formatted).replace("%total_interest%",n.total_interest_formatted);a.html(r)}else a.html(e.error_text);e.callback(t,n)},i=function(t,e,a){var n=c(t,e,"term_compare");!1===n&&(n=c(t,e,"term"));var r=m.loanInfo({amount:c(t,e,"amount"),rate:c(t,e,"rate"),term:c(t,e,"term")}),o=m.loanInfo({amount:c(t,e,"amount"),rate:c(t,e,"rate_compare"),term:n}),i={loan_1:r,loan_2:o};if(0!==r&&0!==o){0<r.total_interest-o.total_interest?i.savings=r.total_interest-o.total_interest:i.savings=0;var s=e.response_compare.replace("%savings%",i.savings.toFixed(2)).replace("%loan_2_payment_amount%",o.payment_amount_formatted).replace("%loan_2_num_payments%",o.num_payments).replace("%loan_2_total_payments%",o.total_payments_formatted).replace("%loan_2_total_interest%",o.total_interest_formatted).replace("%loan_1_payment_amount%",r.payment_amount_formatted).replace("%loan_1_num_payments%",r.num_payments).replace("%loan_1_total_payments%",r.total_payments_formatted).replace("%loan_1_total_interest%",r.total_interest_formatted);a.html(s)}else a.html(e.error_text);e.callback(t,i)},s=function(t,e,a){var n=m.loanInfo({amount:c(t,e,"amount"),rate:c(t,e,"rate"),term:c(t,e,"term")});if(0!==n){var r='<table class="accrue-amortization"><tr><th class="accrue-payment-number">#</th><th class="accrue-payment-amount">Payment Amt.</th><th class="accrue-total-interest">Total Interest</th><th class="accrue-total-payments">Total Payments</th><th class="accrue-balance">Balance</th></tr>',o=n.payment_amount-n.original_amount/n.num_payments,i=n.payment_amount-o;counter_interest=0,counter_payment=0,counter_balance=parseInt(n.original_amount);for(var s=0;s<n.num_payments;s++){counter_interest+=o,counter_payment+=n.payment_amount,counter_balance-=i;var l="td";s==n.num_payments-1&&(l="th"),r=r+"<tr><"+l+' class="accrue-payment-number">'+(s+1)+"</"+l+"><"+l+' class="accrue-payment-amount">$'+n.payment_amount_formatted+"</"+l+"><"+l+' class="accrue-total-interest">$'+counter_interest.toFixed(2)+"</"+l+"><"+l+' class="accrue-total-payments">$'+counter_payment.toFixed(2)+"</"+l+"><"+l+' class="accrue-balance">$'+counter_balance.toFixed(2)+"</"+l+"></tr>"}r+="</table>",a.html(r)}else a.html(e.error_text);e.callback(t,n)};m.loanInfo=function(t){var e=(void 0!==t.amount?t.amount:0).replace(/[^\d.]/gi,""),a=(void 0!==t.rate?t.rate:0).replace(/[^\d.]/gi,""),n=void 0!==t.term?t.term:0;n=n.match("y")?12*parseInt(n.replace(/[^\d.]/gi,"")):parseInt(n.replace(/[^\d.]/gi,""));var r=a/1200,o=e*(r/(1-Math.pow(1+r,-1*n)));return 0<e*a*n?{original_rate:a,original_term:n,original_amount:e,payment_amount:o,payment_amount_formatted:o.toFixed(2),num_payments:n,total_payments:o*n,total_payments_formatted:(o*n).toFixed(2),total_interest:o*n-e,total_interest_formatted:(o*n-e).toFixed(2)}:0}}(jQuery,window,document),$(function(){$(".promotion > div:gt(0)").hide(),setInterval(function(){$(".promotion > div:first").hide().next().show().end().appendTo(".promotion")},4e3)}),$(function(){$(".calculator.loan-auto").accrue({mode:"compare",response_output_div:".result.auto",response_compare:"You Save: <strong>$%savings%</strong>",error_text:""}),$(".calculator.loan-home").accrue({mode:"compare",response_output_div:".result.home",response_compare:"You Save: <strong>$%savings%</strong>",error_text:""}),$(".calculator.loan-personal").accrue({mode:"compare",response_output_div:".result.personal",response_compare:"You Save: <strong>$%savings%</strong>",error_text:""}),$(".numbers-only").keyup(function(){var t=$(this).val().replace(/[^0-9.]/g,"");$(this).val(t)})});var valid_email=function(t){return-1!=String(t).search(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)},contact_submit=function(t){$(t).find("input[type=submit]").attr("disabled","disabled");var e=0;$("input[name=reason]:checked").each(function(){0<e&&",",$(this).val(),e++});var a={name:$(t).find("input[name=name]").val(),email:$(t).find("input[name=email]").val(),phone:$(t).find("input[name=phone]").val(),message:$(t).find("textarea").val()},n=$.param(a),r=[],o=$(t).find(".error");return o.html(""),a.name.length<2&&r.push("Please provide a name."),valid_email(a.email)||r.push("Please provide a valid email address."),0==r.length?$.post("/send.php",n,function(t){"success"===t?location.href="/thanks.html":o.html("There was a problem submitting the form. Please call us for further assistance.").slideDown(400)}):(o.html(""),$.each(r,function(t,e){0===t?o.append(e):o.append("<br>"+e)}),o.is(":hidden")&&o.slideDown(400)),!1};$(document).ready(function(){$("form#contact").submit(function(t){t.preventDefault(),contact_submit(this)})}),function(r){"use strict";r.fn.fitVids=function(t){var a={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var e=document.head||document.getElementsByTagName("head")[0],n=document.createElement("div");n.innerHTML='<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>',e.appendChild(n.childNodes[1])}return t&&r.extend(a,t),this.each(function(){var t=['iframe[src*="player.vimeo.com"]','iframe[src*="youtube.com"]','iframe[src*="youtube-nocookie.com"]','iframe[src*="kickstarter.com"][src*="video.html"]',"object","embed"];a.customSelector&&t.push(a.customSelector);var n=".fitvidsignore";a.ignore&&(n=n+", "+a.ignore);var e=r(this).find(t.join(","));(e=(e=e.not("object object")).not(n)).each(function(){var t=r(this);if(!(0<t.parents(n).length||"embed"===this.tagName.toLowerCase()&&t.parent("object").length||t.parent(".fluid-width-video-wrapper").length)){t.css("height")||t.css("width")||!isNaN(t.attr("height"))&&!isNaN(t.attr("width"))||(t.attr("height",9),t.attr("width",16));var e=("object"===this.tagName.toLowerCase()||t.attr("height")&&!isNaN(parseInt(t.attr("height"),10))?parseInt(t.attr("height"),10):t.height())/(isNaN(parseInt(t.attr("width"),10))?t.width():parseInt(t.attr("width"),10));if(!t.attr("name")){var a="fitvid"+r.fn.fitVids._count;t.attr("name",a),r.fn.fitVids._count++}t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*e+"%"),t.removeAttr("height").removeAttr("width")}})})},r.fn.fitVids._count=0}(window.jQuery||window.Zepto),$(document).ready(function(){$(".video").fitVids()});