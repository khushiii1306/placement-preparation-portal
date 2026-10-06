import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const PlacementHub3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    // Transparent background so it overlays the dark navy hero section seamlessly
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 9.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const royalBlueRimLight = new THREE.PointLight(0x3b82f6, 4.0, 25);
    royalBlueRimLight.position.set(0, 3, -4);
    scene.add(royalBlueRimLight);

    const deepBlueGlow = new THREE.PointLight(0x2563eb, 3.2, 18);
    deepBlueGlow.position.set(0, -2.5, 3);
    scene.add(deepBlueGlow);

    const blueSoftLight = new THREE.DirectionalLight(0x60a5fa, 1.5);
    blueSoftLight.position.set(-6, 2, 4);
    scene.add(blueSoftLight);

    // Main 3D Rig Group (holds all interactive objects)
    const hubGroup = new THREE.Group();
    scene.add(hubGroup);

    // -------------------------------------------------------------------------
    // 3. CANVAS TEXTURE CREATORS
    // -------------------------------------------------------------------------

    // A. IDE Laptop Screen Texture (Aptitude & Coding Practice Interface)
    const createScreenTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 640;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Deep Navy / Dark Slate IDE Canvas Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1024, 640);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.5, '#0b1120');
      bgGrad.addColorStop(1, '#080c14');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1024, 640);

      // Top Window Header Bar
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 1024, 48);

      // Mac / IDE Window Action Dots
      const drawDot = (x: number, y: number, color: string) => {
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      };
      drawDot(24, 24, '#ef4444');
      drawDot(44, 24, '#f59e0b');
      drawDot(64, 24, '#10b981');

      // Top Tabs
      ctx.fillStyle = '#1e293b';
      ctx.roundRect(110, 8, 210, 32, 6);
      ctx.fill();
      ctx.font = 'bold 13px "Plus Jakarta Sans", monospace';
      ctx.fillStyle = '#2dd4bf';
      ctx.fillText('⚡ Aptitude_Quant.py', 125, 29);

      ctx.fillStyle = '#131d31';
      ctx.roundRect(330, 8, 200, 32, 6);
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('</> Solution.cpp', 350, 29);

      ctx.fillStyle = '#131d31';
      ctx.roundRect(540, 8, 200, 32, 6);
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('🏆 Mock_Test_2026.ts', 555, 29);

      // Live Proctored Assessment Badge on top right
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.roundRect(800, 10, 200, 28, 14);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(820, 24, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#a7f3d0';
      ctx.fillText('Placement Arena Live', 835, 28);

      // Main Split Layout: Left 62% Code Editor, Right 38% Aptitude & Readiness Gauge
      // Left: Syntax-Highlighted Code Editor
      ctx.fillStyle = '#0a0e1a';
      ctx.fillRect(16, 60, 610, 560);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(16, 60, 610, 560);

      // Code Line Numbers & Syntax
      const lines = [
        { num: '01', text: '// Campus Placement Preparation Engine', color: '#64748b' },
        { num: '02', text: '#include <bits/stdc++.h>', color: '#c084fc' },
        { num: '03', text: 'using namespace std;', color: '#f43f5e' },
        { num: '04', text: '', color: '' },
        { num: '05', text: 'bool isEligibleForSuperDream(Candidate c) {', color: '#38bdf8' },
        { num: '06', text: '    int quantScore = c.getQuantScore();   // 96%', color: '#94a3b8' },
        { num: '07', text: '    int dsaScore = c.solveOptimalDSA();   // O(N log N)', color: '#94a3b8' },
        { num: '08', text: '    int mockPercentile = c.getMockRank(); // 98.4%', color: '#94a3b8' },
        { num: '09', text: '    if (quantScore >= 90 && dsaScore >= 95) {', color: '#facc15' },
        { num: '10', text: '        return OFFER_RECEIVED_TIER_1;     // ₹14+ LPA', color: '#2dd4bf' },
        { num: '11', text: '    }', color: '#38bdf8' },
        { num: '12', text: '    return CANDIDATE_SHORTLISTED;', color: '#38bdf8' },
        { num: '13', text: '}', color: '#38bdf8' },
      ];

      ctx.font = '13px "Courier New", monospace';
      lines.forEach((line, idx) => {
        const y = 92 + idx * 26;
        ctx.fillStyle = '#475569';
        ctx.fillText(line.num, 30, y);
        if (line.text) {
          ctx.fillStyle = line.color;
          ctx.fillText(line.text, 68, y);
        }
      });

      // Bottom Test Runner Output Box
      ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
      ctx.roundRect(30, 470, 580, 130, 8);
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('✔ ALL 18 TEST CASES PASSED', 50, 502);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Runtime: 0.012s • Memory: 14.2 MB • Optimal Time Complexity: O(N log N)', 50, 530);

      // Run Code Button inside IDE
      ctx.fillStyle = '#0d9488';
      ctx.roundRect(50, 550, 180, 34, 6);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('▶ Run Aptitude Test', 80, 572);

      // Right 38%: Aptitude Diagnostics & Readiness Gauge
      ctx.fillStyle = '#0c1322';
      ctx.fillRect(638, 60, 370, 560);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeRect(638, 60, 370, 560);

      // Circular Radial Placement Gauge
      const cx = 823;
      const cy = 175;
      const radius = 62;

      // Track ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 12;
      ctx.stroke();

      // Filled glow arc (94.6% readiness)
      ctx.beginPath();
      ctx.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.946);
      ctx.strokeStyle = '#2dd4bf';
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Center Percentage
      ctx.fillStyle = '#ffffff';
      ctx.font = 'black 28px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('94.6%', cx, cy + 4);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('CAMPUS READY', cx, cy + 24);
      ctx.textAlign = 'left';

      // Domain Scores Bars
      const skills = [
        { name: 'Quantitative Aptitude', score: '96%', pct: 0.96, color: '#38bdf8' },
        { name: 'Data Structures & Algorithms', score: '92%', pct: 0.92, color: '#2dd4bf' },
        { name: 'Logical Reasoning', score: '95%', pct: 0.95, color: '#a78bfa' },
        { name: 'Verbal & Soft Skills', score: '90%', pct: 0.9, color: '#f472b6' },
      ];

      skills.forEach((sk, idx) => {
        const sy = 280 + idx * 56;
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(sk.name, 660, sy);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(sk.score, 960, sy);

        // Bar background
        ctx.fillStyle = '#1e293b';
        ctx.roundRect(660, sy + 8, 330, 8, 4);
        ctx.fill();

        // Bar fill
        ctx.fillStyle = sk.color;
        ctx.roundRect(660, sy + 8, 330 * sk.pct, 8, 4);
        ctx.fill();
      });

      // Target Company Shortlist Badge
      ctx.fillStyle = 'rgba(20, 184, 166, 0.1)';
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.4)';
      ctx.roundRect(660, 520, 330, 80, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#2dd4bf';
      ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('🎯 Eligible Recruiters Match', 680, 548);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('TCS Digital • Infosys SP • Wipro Turbo', 680, 574);

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;
      return texture;
    };

    // B. Floating Card Canvas Texture Generator
    const createCardTexture = (
      title: string,
      subtitle: string,
      metric: string,
      tag: string,
      primaryColor: string,
      accentGlow: string
    ): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 320;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Card Background with Subtle Glass Gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 320);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#0b1120');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.roundRect(6, 6, 500, 308, 24);
      ctx.fill();

      // Glowing Border
      ctx.strokeStyle = accentGlow;
      ctx.lineWidth = 4;
      ctx.roundRect(6, 6, 500, 308, 24);
      ctx.stroke();

      // Icon Container Box
      ctx.fillStyle = primaryColor + '22';
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.roundRect(36, 36, 54, 54, 14);
      ctx.fill();
      ctx.stroke();

      // Simple High-Contrast Vector Glyph
      ctx.fillStyle = primaryColor;
      if (title === 'APTITUDE') {
        ctx.font = 'bold 26px Arial, sans-serif';
        ctx.fillText('∑', 52, 73);
      } else if (title === 'CODING') {
        ctx.font = 'bold 22px monospace';
        ctx.fillText('</>', 45, 71);
      } else if (title === 'MOCK TEST') {
        ctx.font = 'bold 24px Arial, sans-serif';
        ctx.fillText('⏱', 48, 72);
      } else {
        ctx.font = 'bold 24px Arial, sans-serif';
        ctx.fillText('📈', 48, 72);
      }

      // Card Header Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'black 28px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(title, 106, 65);

      // Card Subtitle
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(subtitle, 106, 92);

      // Inner Metrics Highlight Card
      ctx.fillStyle = '#1e293b77';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.roundRect(36, 120, 440, 100, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = primaryColor;
      ctx.font = 'black 34px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(metric, 56, 166);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(tag, 56, 198);

      // Status Indicator Pill on Bottom
      ctx.fillStyle = '#10b98122';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.roundRect(36, 246, 200, 36, 18);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(56, 264, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.fillStyle = '#a7f3d0';
      ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Active Prep Module', 70, 269);

      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = 8;
      return texture;
    };

    // -------------------------------------------------------------------------
    // 4. CENTRAL 3D LAPTOP MESH ASSEMBLY
    // -------------------------------------------------------------------------
    const laptopGroup = new THREE.Group();
    hubGroup.add(laptopGroup);

    // Aluminum chassis material (Deep slate-navy with soft metallic finish)
    const chassisMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.82,
      roughness: 0.25,
    });

    // Glowing edge accent material (Neon teal)
    const glowEdgeMaterial = new THREE.MeshBasicMaterial({
      color: 0x14b8a6,
    });

    // Laptop Base Body
    const baseGeometry = new THREE.BoxGeometry(4.4, 0.14, 2.9);
    const laptopBase = new THREE.Mesh(baseGeometry, chassisMaterial);
    laptopBase.position.y = -0.5;
    laptopGroup.add(laptopBase);

    // Subtle Glowing Edge Line on Front Lip of Laptop
    const edgeGeo = new THREE.BoxGeometry(4.42, 0.04, 0.04);
    const edgeMesh = new THREE.Mesh(edgeGeo, glowEdgeMaterial);
    edgeMesh.position.set(0, -0.48, 1.45);
    laptopGroup.add(edgeMesh);

    // Keyboard Recess Tray
    const keyboardTrayGeo = new THREE.BoxGeometry(3.9, 0.02, 1.6);
    const keyboardTrayMat = new THREE.MeshStandardMaterial({
      color: 0x070b14,
      metalness: 0.6,
      roughness: 0.5,
    });
    const keyboardTray = new THREE.Mesh(keyboardTrayGeo, keyboardTrayMat);
    keyboardTray.position.set(0, -0.42, -0.3);
    laptopGroup.add(keyboardTray);

    // Illuminated Keyboard Keys Grid
    const keyRows = 5;
    const keyCols = 14;
    const keyWidth = 0.23;
    const keyHeight = 0.02;
    const keyDepth = 0.22;
    const keyGap = 0.04;
    const keyGeo = new THREE.BoxGeometry(keyWidth, keyHeight, keyDepth);
    const keyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.5,
      roughness: 0.4,
    });

    for (let r = 0; r < keyRows; r++) {
      for (let c = 0; c < keyCols; c++) {
        const keyMesh = new THREE.Mesh(keyGeo, keyMat);
        keyMesh.position.set(
          (c - keyCols / 2 + 0.5) * (keyWidth + keyGap),
          -0.41,
          -0.9 + r * (keyDepth + keyGap)
        );
        laptopGroup.add(keyMesh);
      }
    }

    // Glass Trackpad
    const trackpadGeo = new THREE.BoxGeometry(1.3, 0.02, 0.85);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.15,
    });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, -0.42, 0.82);
    laptopGroup.add(trackpad);

    // Screen Hinge (Rotates open)
    const hingeGroup = new THREE.Group();
    hingeGroup.position.set(0, -0.43, -1.4);
    laptopGroup.add(hingeGroup);

    // Screen Lid Box
    const screenFrameGeo = new THREE.BoxGeometry(4.4, 2.85, 0.1);
    const screenFrame = new THREE.Mesh(screenFrameGeo, chassisMaterial);
    screenFrame.position.set(0, 1.42, 0);
    hingeGroup.add(screenFrame);

    // Glowing IDE Screen Display Plane
    const screenDisplayGeo = new THREE.PlaneGeometry(4.2, 2.65);
    const screenTexture = createScreenTexture();
    const screenDisplayMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const screenDisplay = new THREE.Mesh(screenDisplayGeo, screenDisplayMat);
    screenDisplay.position.set(0, 1.42, 0.055);
    hingeGroup.add(screenDisplay);

    // Screen Back Ambient Light (Glows behind the laptop)
    const screenBackLight = new THREE.PointLight(0x00f2fe, 3.2, 8);
    screenBackLight.position.set(0, 1.42, -0.6);
    hingeGroup.add(screenBackLight);

    // Angle screen back at ~108 degrees for ergonomic 3D perspective
    hingeGroup.rotation.x = -Math.PI * 0.09;

    // -------------------------------------------------------------------------
    // 5. FLOATING 3D CARDS (Aptitude, Coding, Mock Test, Progress)
    // -------------------------------------------------------------------------
    interface FloatingCard {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      speed: number;
      orbitRadius: number;
      orbitSpeed: number;
      phase: number;
    }

    const floatingCards: FloatingCard[] = [];
    const cardGeo = new THREE.BoxGeometry(2.1, 1.3, 0.06);

    const cardConfigs = [
      {
        title: 'APTITUDE',
        sub: 'Quant & Logical Reasoning',
        metric: '96% Accuracy',
        tag: '500+ Practice MCQs Solved',
        color: '#60a5fa',
        glow: '#2563eb',
        pos: new THREE.Vector3(-3.3, 1.8, 1.0),
        speed: 1.1,
        phase: 0,
      },
      {
        title: 'CODING',
        sub: 'DSA • C++ • Java • Python',
        metric: '18 Solved',
        tag: 'Optimal Complexity Achieved',
        color: '#3b82f6',
        glow: '#1d4ed8',
        pos: new THREE.Vector3(3.3, 1.9, 0.8),
        speed: 1.3,
        phase: Math.PI * 0.5,
      },
      {
        title: 'MOCK TEST',
        sub: 'TCS • Infosys • Wipro Pattern',
        metric: 'Rank #14',
        tag: 'Full Proctored Simulation',
        color: '#818cf8',
        glow: '#4338ca',
        pos: new THREE.Vector3(-3.1, -1.0, 1.6),
        speed: 0.9,
        phase: Math.PI * 1.0,
      },
      {
        title: 'PROGRESS',
        sub: 'Placement Readiness Index',
        metric: '94.6%',
        tag: 'Super Dream Shortlist Target',
        color: '#93c5fd',
        glow: '#2563eb',
        pos: new THREE.Vector3(3.1, -0.9, 1.4),
        speed: 1.2,
        phase: Math.PI * 1.5,
      },
    ];

    cardConfigs.forEach((cfg) => {
      const texture = createCardTexture(cfg.title, cfg.sub, cfg.metric, cfg.tag, cfg.color, cfg.glow);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
      });

      const cardMesh = new THREE.Mesh(cardGeo, mat);
      cardMesh.position.copy(cfg.pos);
      hubGroup.add(cardMesh);

      floatingCards.push({
        mesh: cardMesh,
        basePos: cfg.pos.clone(),
        speed: cfg.speed,
        orbitRadius: 0.15,
        orbitSpeed: 0.8,
        phase: cfg.phase,
      });
    });

    // -------------------------------------------------------------------------
    // 6. 3D RISING PROGRESS GRAPH (Pillars Growing Upward)
    // -------------------------------------------------------------------------
    const graphGroup = new THREE.Group();
    graphGroup.position.set(2.4, -0.6, 0.2);
    hubGroup.add(graphGroup);

    const pillars: { mesh: THREE.Mesh; baseHeight: number; speed: number; phase: number }[] = [];
    const pillarCount = 5;
    const pillarWidth = 0.16;
    const heights = [0.45, 0.8, 1.15, 1.55, 2.05];

    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.9,
    });

    for (let i = 0; i < pillarCount; i++) {
      const h = heights[i];
      const pGeo = new THREE.BoxGeometry(pillarWidth, h, pillarWidth);
      const pMesh = new THREE.Mesh(pGeo, pillarMat);
      pMesh.position.set(i * 0.28, h / 2, 0);
      graphGroup.add(pMesh);

      pillars.push({
        mesh: pMesh,
        baseHeight: h,
        speed: 1.5 + i * 0.2,
        phase: i * 0.4,
      });
    }

    // Glowing Waypoint Sphere at top of highest pillar
    const waypointGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const waypointMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const waypointMesh = new THREE.Mesh(waypointGeo, waypointMat);
    waypointMesh.position.set((pillarCount - 1) * 0.28, heights[pillarCount - 1] + 0.12, 0);
    graphGroup.add(waypointMesh);

    // -------------------------------------------------------------------------
    // 7. FLOATING TARGET & ACHIEVEMENT BADGE
    // -------------------------------------------------------------------------
    const achievementGroup = new THREE.Group();
    achievementGroup.position.set(0, 2.9, -0.6);
    hubGroup.add(achievementGroup);

    // Outer Torus Ring
    const torusGeo = new THREE.TorusGeometry(0.55, 0.04, 16, 40);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    achievementGroup.add(torusMesh);

    // Inner Star / Diamond Core
    const diamondGeo = new THREE.OctahedronGeometry(0.28);
    const diamondMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.2,
    });
    const diamondMesh = new THREE.Mesh(diamondGeo, diamondMat);
    achievementGroup.add(diamondMesh);

    // -------------------------------------------------------------------------
    // 8. SMALL FLOATING 3D ELEMENTS (Briefcase, Checkmark Badges)
    // -------------------------------------------------------------------------
    const floatingElements: { mesh: THREE.Object3D; speed: number; rotSpeed: number }[] = [];

    // Checkmark Badges
    const createCheckmarkBadge = (x: number, y: number, z: number): THREE.Mesh => {
      const discGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.04, 24);
      discGeo.rotateX(Math.PI / 2);
      const discMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x059669,
        emissiveIntensity: 0.5,
        metalness: 0.7,
        roughness: 0.2,
      });
      const badge = new THREE.Mesh(discGeo, discMat);
      badge.position.set(x, y, z);
      hubGroup.add(badge);
      return badge;
    };

    const check1 = createCheckmarkBadge(-2.2, 0.3, 1.2);
    const check2 = createCheckmarkBadge(2.2, 0.4, 1.2);
    floatingElements.push({ mesh: check1, speed: 1.2, rotSpeed: 0.02 });
    floatingElements.push({ mesh: check2, speed: 1.4, rotSpeed: -0.015 });

    // Floating 3D Mini Briefcase
    const briefcaseGroup = new THREE.Group();
    const caseBodyGeo = new THREE.BoxGeometry(0.38, 0.26, 0.14);
    const caseBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.3,
    });
    const caseBody = new THREE.Mesh(caseBodyGeo, caseBodyMat);
    briefcaseGroup.add(caseBody);

    const handleGeo = new THREE.TorusGeometry(0.08, 0.015, 8, 16, Math.PI);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.1 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 0.13;
    handle.rotation.z = Math.PI;
    briefcaseGroup.add(handle);

    briefcaseGroup.position.set(-2.2, -1.8, 0.5);
    hubGroup.add(briefcaseGroup);
    floatingElements.push({ mesh: briefcaseGroup, speed: 1.1, rotSpeed: 0.01 });

    // -------------------------------------------------------------------------
    // 9. AMBIENT LUMINOUS PARTICLES
    // -------------------------------------------------------------------------
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const pColorChoices = [
      new THREE.Color(0x00f2fe),
      new THREE.Color(0x10b981),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 14;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 8;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 8;

      const col = pColorChoices[Math.floor(Math.random() * pColorChoices.length)];
      particleColors[idx] = col.r;
      particleColors[idx + 1] = col.g;
      particleColors[idx + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // -------------------------------------------------------------------------
    // 10. MOUSE INTERACTION & SMOOTH PARALLAX
    // -------------------------------------------------------------------------
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = x * 0.28;
      targetRotationX = -y * 0.18;
    };

    container.addEventListener('pointermove', handlePointerMove);

    // -------------------------------------------------------------------------
    // 11. 60FPS ANIMATION LOOP
    // -------------------------------------------------------------------------
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth mouse parallax damping
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      hubGroup.rotation.x = currentRotationX + Math.sin(elapsed * 0.5) * 0.02;
      hubGroup.rotation.y = currentRotationY;

      // Subtle Laptop Breathing/Bobbing
      laptopGroup.position.y = Math.sin(elapsed * 1.2) * 0.08;
      laptopGroup.rotation.y = Math.sin(elapsed * 0.8) * 0.03;

      // Floating 3D Cards Harmonic Float & Subtle Orbit
      floatingCards.forEach((c) => {
        c.mesh.position.y = c.basePos.y + Math.sin(elapsed * c.speed + c.phase) * 0.12;
        c.mesh.position.x = c.basePos.x + Math.cos(elapsed * c.orbitSpeed + c.phase) * 0.08;
        c.mesh.rotation.y = Math.sin(elapsed * 0.9 + c.phase) * 0.06;
        c.mesh.rotation.z = Math.cos(elapsed * 0.7 + c.phase) * 0.03;
      });

      // Animating 3D Rising Progress Graph (bars pulse and grow upward)
      pillars.forEach((p) => {
        const scaleY = 1 + Math.sin(elapsed * p.speed + p.phase) * 0.12;
        p.mesh.scale.y = scaleY;
        p.mesh.position.y = (p.baseHeight * scaleY) / 2;
      });

      // Target Achievement Rings rotate slowly
      achievementGroup.rotation.z += 0.008;
      achievementGroup.rotation.y += 0.005;
      diamondMesh.rotation.y += 0.02;
      diamondMesh.rotation.x += 0.015;

      // Small floating elements gentle rotation and bobbing
      floatingElements.forEach((el, idx) => {
        el.mesh.rotation.y += el.rotSpeed;
        el.mesh.position.y += Math.sin(elapsed * el.speed + idx) * 0.002;
      });

      // Floating ambient particles drifting
      particles.rotation.y = elapsed * 0.03;
      particles.rotation.x = elapsed * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // -------------------------------------------------------------------------
    // 12. RESIZE LISTENER
    // -------------------------------------------------------------------------
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      screenTexture.dispose();
      baseGeometry.dispose();
      cardGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full max-w-6xl mx-auto h-[440px] sm:h-[500px] lg:h-[540px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Soft Ambient Radial Background Glows (Deep Navy + Neon Green/Teal) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[320px] sm:h-[420px] w-[320px] sm:w-[540px] rounded-full bg-teal-500/15 blur-[90px]" />
        <div className="h-[260px] sm:h-[340px] w-[260px] sm:w-[440px] rounded-full bg-emerald-500/12 blur-[80px]" />
      </div>

      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Subtle Hint Chip for interactive exploration */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full border border-teal-500/30 bg-slate-900/80 px-4 py-1.5 text-[11px] font-bold text-teal-300 backdrop-blur-md shadow-lg shadow-teal-500/10">
        <span className="flex h-2 w-2 rounded-full bg-teal-400 animate-ping" />
        <span>Interactive 3D Placement Hub • Move Cursor to Explore</span>
      </div>
    </div>
  );
};
