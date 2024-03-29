			var container;
			var camera, scene, renderer;

			var raycaster;
			var mouse;
			init();
			animate();
			function init() {
				container = document.createElement( 'div' );
				document.body.appendChild( container );
								camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.y = 300;
				camera.position.z = 500;
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );
				var geometry = new THREE.BoxBufferGeometry( 100, 100, 100 );
				for ( var i = 0; i < 20; i ++ ) {
					var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, opacity: 0.5 } ) );
					object.position.x = Math.random() * 800 - 400;
					object.position.y = Math.random() * 800 - 400;
					object.position.z = Math.random() * 800 - 400;
					object.scale.x = Math.random() * 2 + 1;
					object.scale.y = Math.random() * 2 + 1;
					object.scale.z = Math.random() * 2 + 1;
					object.rotation.x = Math.random() * 2 * Math.PI;
					object.rotation.y = Math.random() * 2 * Math.PI;
					object.rotation.z = Math.random() * 2 * Math.PI;
					scene.add( object );
				}

				//

				raycaster = new THREE.Raycaster();
				mouse = new THREE.Vector2();
				renderer = new THREE.CanvasRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild(renderer.domElement);
				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function onDocumentTouchStart( event ) {

				event.preventDefault();

				event.clientX = event.touches[0].clientX;
				event.clientY = event.touches[0].clientY;
				onDocumentMouseDown( event );
			}
			function onDocumentMouseDown( event ) {
				event.preventDefault();
				mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
				raycaster.setFromCamera( mouse, camera );
				var intersects = raycaster.intersectObjects( scene.children );
				if ( intersects.length > 0 ) {
					new TWEEN.Tween( intersects[ 0 ].object.position ).to( {
						x: Math.random() * 800 - 400,
						y: Math.random() * 800 - 400,
						z: Math.random() * 800 - 400 }, 2000 )
					.easing( TWEEN.Easing.Elastic.Out).start();
					new TWEEN.Tween( intersects[ 0 ].object.rotation ).to( {
						x: Math.random() * 2 * Math.PI,
						y: Math.random() * 2 * Math.PI,
						z: Math.random() * 2 * Math.PI }, 2000 )
					.easing( TWEEN.Easing.Elastic.Out).start();
				}
				/*
				// Parse all the faces
				for ( var i in intersects ) {
					intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );
				}
				*/
			}
			//
			function animate() {
				requestAnimationFrame( animate );
				render();
			}
			var radius = 600;
			var theta = 0;
			function render() {
				TWEEN.update();
				theta += 0.1;
				camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
				camera.lookAt( scene.position );
				renderer.render( scene, camera );
			}
