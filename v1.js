
document.addEventListener("DOMContentLoaded", function () {
    let slideshow = document.getElementById("slideshow");

    document.querySelector(".left-btn").addEventListener("click", function () {
        slideshow.scrollBy({ left: -380, behavior: "smooth" });
    });

    document.querySelector(".right-btn").addEventListener("click", function () {
        slideshow.scrollBy({ left: 380, behavior: "smooth" });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('3d-container');
    if (!container) {
        console.error("3d-container not found!");
        return; // Exit if the container is not found
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Bright white light
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load the Blender file
    const loader = new THREE.GLTFLoader();
    loader.load('./assets/MixMinds.glb', function (gltf) {
        const model = gltf.scene;
        model.scale.set(4, 6, 10); // Adjust scale as needed
        model.position.set(0, 0, 0); // Center the model
        scene.add(model);
    }, undefined, function (error) {
        console.error("An error occurred while loading the model:", error);
    });

    // Set a background color
    scene.background = new THREE.Color(0xeeeeee); // Light gray background

    camera.position.set(0, 0, 10); // Adjust camera position

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});