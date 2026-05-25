'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NeuralBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Nodes
    const nodeCount = 200;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositionArray = new Float32Array(nodeCount * 3);
    const nodeSizes = new Float32Array(nodeCount);

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 120;
      const z = (Math.random() - 0.5) * 60;
      nodePositions.push(new THREE.Vector3(x, y, z));
      nodePositionArray[i * 3] = x;
      nodePositionArray[i * 3 + 1] = y;
      nodePositionArray[i * 3 + 2] = z;
      nodeSizes[i] = Math.random() * 2 + 0.5;
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositionArray, 3));
    nodeGeometry.setAttribute('size', new THREE.BufferAttribute(nodeSizes, 1));

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x00A8FF,
      size: 0.8,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodes);

    // Connections
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionPositions: number[] = [];
    const connectionColors: number[] = [];
    const maxDist = 35;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < maxDist) {
          connectionPositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
          const alpha = 1 - dist / maxDist;
          connectionColors.push(0, 0.42 * alpha, 0.8 * alpha);
          connectionColors.push(0, 0.42 * alpha, 0.8 * alpha);
        }
      }
    }

    connectionGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(connectionPositions), 3));
    connectionGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(connectionColors), 3));

    const connectionMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
    });

    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    scene.add(connections);

    // Floating particles
    const particleCount = 300;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 240;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 160;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x0066cc,
      size: 0.3,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let animId: number;
    let startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000;

      nodes.rotation.y = t * 0.03;
      nodes.rotation.x = t * 0.01;
      connections.rotation.y = t * 0.03;
      connections.rotation.x = t * 0.01;
      particles.rotation.y = -t * 0.02;

      // Pulsing opacity
      nodeMaterial.opacity = 0.5 + Math.sin(t * 0.8) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      nodeGeometry.dispose();
      connectionGeometry.dispose();
      nodeMaterial.dispose();
      connectionMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
