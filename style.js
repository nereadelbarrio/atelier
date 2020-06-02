(function (blink) {
	'use strict';

	var atelierStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	atelierStyle.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_atelier',
		ckEditorStyles: {
			name: 'atelier',
			styles: [

				{ name: 'Título 1', element: 'h4', attributes: { 'class': 'bck-title bck-title1'} },
				{ name: 'Título 2', element: 'h4', attributes: { 'class': 'bck-title bck-title2'} },
				
				{ name: 'Círculo azul', element: 'span', attributes: { 'class': 'bck-enfasis-1'} },
				{ name: 'Morado', element: 'span', attributes: { 'class': 'bck-enfasis-2'} },
				{ name: 'Naranja', element: 'span', attributes: { 'class': 'bck-enfasis-3'} },
				{ name: 'Gris', element: 'span', attributes: { 'class': 'bck-enfasis-4'} },
				{ name: 'Subrayado naranja', element: 'span', attributes: { 'class': 'bck-enfasis-5'} },
				{ name: 'Círculo morado', element: 'span', attributes: { 'class': 'bck-enfasis-6'} },
				{ name: 'Subrayado rosa', element: 'span', attributes: { 'class': 'bck-enfasis-7'} },

				{ name: 'Lista num 1', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-1' } },
				{ name: 'Lista letras 1', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-2' } },
				{ name: 'Lista num 2', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-3' } },
				{ name: 'Lista num 3', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-4' } },
				{ name: 'Lista num 4', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-5' } },
				{ name: 'Lista num 5', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-6' } },

				{ name: 'Caja 1 azul', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-1' } },
				{ name: 'Caja 2 naranja', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-2' } },
				{ name: 'Caja 3', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-3' } },

				{ name: 'Icono Observez', element: 'span', attributes: { 'class': 'icon icon-observez' } },
				{ name: 'Icono Appliquez', element: 'span', attributes: { 'class': 'icon icon-appliquez' } },
				{ name: 'Icono mano', element: 'span', attributes: { 'class': 'icon icon-mano' } }
			]
		},

		init: function (scope) {
			var that = scope || this;
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(that);
			that.addActivityTitle();
			if(window.esWeb) return;
			that.removeFinalSlide();
			that.handleScrollEnd();
			that.setTooltip();
			window.editar && that.configEditor();

			if ($('.navbar-bottom').length > 0) {
 				$('.navbar-bottom ol').wrapAll('<div id="bottom-navigator"></div>');
		 		var width = 0;
		 		$('.navbar-bottom li').each(function(i, elem){ width += $(elem).outerWidth(true); });
		 		$('.navbar-bottom ol').css('width', width * 1.1);
		 		var scroll = new IScroll('#bottom-navigator', {
		 			scrollX: true,
		 			scrollY: false,
		 			eventPassthrough: true
		 		});
		 		scroll.on('scrollEnd', that.handleScrollEnd);
		 		that.handleScrollEnd.call(scroll);
	 		}

		},

		configEditor: function (editor) {
			editor.dtd.$removeEmpty['span'] = false;
		},


		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html().trim() + ' > ' + blink.courseInfo.unit;
			});
		},

		handleScrollEnd: function () {
 			$('#bottom-navigator')
 				.removeClass('show_left')
 				.removeClass('show_right');

 			if (this.x < 0) {
 				$('#bottom-navigator').addClass('show_left');
 			}
 			if (this.x > this.maxScrollX) {
 				$('#bottom-navigator').addClass('show_right');
 			}

 		},

		setTooltip: function () {},

		//BK-15873 Quitamos la funcion getEditorStyles para que la herede de basic
	};

	atelierStyle.prototype = _.extend({}, new blink.theme.styles.basic(), atelierStyle.prototype);

	blink.theme.styles.atelier = atelierStyle;

})( blink );

