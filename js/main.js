/*
import * as THREE from 'three';
import { FontLoader } from '../examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from "../examples/jsm/geometries/TextGeometry.js";
*/
import * as THREE from 'three';
import { FontLoader } from 'https://unpkg.com/three@0.138.3/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://unpkg.com/three@0.138.3/examples/jsm/geometries/TextGeometry.js';

// Scene + camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1500 );

// Global
let box;

var cubeGeo = new THREE.BoxGeometry(5,5,5)
var cubeMat = new THREE.MeshLambertMaterial({color: 0xff3300})
var cube = new THREE.Mesh(cubeGeo, cubeMat)
cube.castShadow = true;
cube.position.y = 2.5;


// Renderer applied to the body element
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor(0xeeeeee)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMapSoft = true
document.body.appendChild( renderer.domElement );

// Initial position of camera
camera.position.set( 10, 10, 10 );
camera.lookAt( scene.position );



// Bulding a line
const createLine = () => {
	const lineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff,  } );
	const points = [];
	points.push( new THREE.Vector3( - 3, 0, 0 ) );
	points.push( new THREE.Vector3( 0, 3, 0 ) );
	points.push( new THREE.Vector3( 3, 0, 0 ) );
	const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
	const line = new THREE.Line( lineGeometry, lineMaterial );
	scene.add( line );
}

// Building a cube geometry
const createCube = (animateCube = false) => {
	const cubeGeometry = new THREE.BoxGeometry( 3, 1, 3 );
	const cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x22ff66 } );
	box = new THREE.Mesh( cubeGeometry, cubeMaterial );
	//box.position.set( 5, 3, 2 );
	box.castShadow = true;
	scene.add( box );

	if( animateCube) {
		console.log(animateCube)
		animate();
	}
}

function animate() {
	requestAnimationFrame( animate );

	box.rotation.x += 0.01;
	box.rotation.y += 0.01;	
}

const createPlane = () => {
	const planeGeometry = new THREE.PlaneGeometry(20,20,20)
	const planeMaterial = new THREE.MeshLambertMaterial(0xff33ff)
	const plane = new THREE.Mesh(planeGeometry,planeMaterial)
	plane.position.y = -5;
	plane.rotation.x = -.5 * Math.PI
	plane.receiveShadow = true;
	scene.add(plane);
}

const createLight = () => {
	const spotlight = new THREE.SpotLight(0xffffff);
	spotlight.castShadow = true;
	spotlight.position.set(20,60,30);
	scene.add(spotlight);
}

const createText = () => {
	const loader = new FontLoader();

	// ../examples/fonts/helvetiker_regular.typeface.json
	loader.load( 'https://cdn.rawgit.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

		const fontGeometry = new TextGeometry( 'Hello three.js!', {
			font: font,
			size: 80,
			height: 5,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 10,
			bevelSize: 8,
			bevelOffset: 0,
			bevelSegments: 5
		} );

		// fontGeometry.computeBoundingBox();
    	// fontGeometry.computeVertexNormals();
		// fontGeometry.center();

		/*
		const text = new THREE.Mesh(fontGeometry, cubeMat);
		text.position.x = -fontGeometry.boundingBox.max.x/2;
		text.position.y = -fontGeometry.boundingBox.max.y/2;

		text.castShadow = true;
		scene.add(text)
		*/
		
		var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
		const mesh = new THREE.Mesh(fontGeometry, material);
		mesh.position.set(0, 2, 0);
		mesh.scale.multiplyScalar(2)
	  	mesh.castShadow = true;
		scene.add(mesh);
		
	} );

	loader.scene = scene;
}


//////////////////////////////////////////////////////////////////////////////////////////////

//createLine();

//createCube(true);

createPlane();

createLight();

createText();

renderer.render( scene, camera );






