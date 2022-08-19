var swiper = new Swiper('.swiper', {
	keyboard : true,
	/* on:{
		setTranslate: function(){
			this.$wrapperEl.transition('')
			TweenMax.to(this.$wrapperEl, 1.5, {x:this.translate, ease:Power4.easeOut})
			
		}
	}, */
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
	pagination: {
        el: ".swiper-pagination",
        clickable: true,
	},
});  