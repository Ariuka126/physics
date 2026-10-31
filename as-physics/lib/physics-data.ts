const T = String.raw;

export type Step = { text: string; tex?: string };
export type Formula = {
  id: string; name: string; tex: string;
  vars: [sym: string, meaning: string, unit: string][];
  conditions: string; steps: Step[]; misconceptions: string[]; tips: string[];
};
export type Topic = { id: string; name: string; formulas: Formula[] };
export type Unit = { id: number; title: string; strand: string; topics: Topic[] };

export const units: Unit[] = [
  { id: 1, title: "Physical Quantities and Units", strand: "Mechanics", topics: [
    { id: "vectors", name: "Scalars, vectors and uncertainty", formulas: [
      { id: "resolve", name: "Resolving a vector", tex: T`F_x = F\cos\theta,\quad F_y = F\sin\theta`,
        vars: [[T`F`, "magnitude of vector", "N (any vector unit)"], [T`\theta`, "angle between F and the x-axis", "° or rad"], [T`F_x, F_y`, "perpendicular components", "N"]],
        conditions: "Perpendicular axes; θ measured from the x-axis.",
        steps: [
          { text: "Draw the vector as the hypotenuse of a right-angled triangle whose other sides lie along the x and y axes." },
          { text: "By definition of cosine in the triangle, adjacent over hypotenuse gives:", tex: T`\cos\theta = \frac{F_x}{F}` },
          { text: "Rearrange. The same argument with the opposite side gives the y component:", tex: T`F_x = F\cos\theta,\qquad F_y = F\sin\theta` },
          { text: "Check: Pythagoras recovers the magnitude, since sin²θ + cos²θ = 1.", tex: T`F_x^2+F_y^2 = F^2(\cos^2\theta+\sin^2\theta)=F^2` }],
        misconceptions: ["Using cos for the component along a slope when the angle is measured from the vertical; always ask which side is adjacent to the angle given.", "Adding vector magnitudes directly instead of adding components."],
        tips: ["Paper 2: state the axes you choose, then resolve; for an inclined plane the weight component along the slope is mg sinθ.", "Check calculator mode is degrees."] },
      { id: "uncert", name: "Combining percentage uncertainties", tex: T`\frac{\Delta (xy)}{xy}=\frac{\Delta x}{x}+\frac{\Delta y}{y}`,
        vars: [[T`\Delta x`, "absolute uncertainty in x", "unit of x"], [T`\Delta x/x`, "fractional uncertainty", "no unit"]],
        conditions: "Quantities multiplied or divided; use the maximum-uncertainty method. Powers: multiply the fractional uncertainty by the power.",
        steps: [
          { text: "Let the true values be x ± Δx and y ± Δy. The largest possible product uses the largest of each:", tex: T`(x+\Delta x)(y+\Delta y)=xy+x\Delta y+y\Delta x+\Delta x\Delta y` },
          { text: "Δx·Δy is a product of two small quantities and is negligible, so the uncertainty in the product is:", tex: T`\Delta(xy)\approx x\,\Delta y + y\,\Delta x` },
          { text: "Divide both sides by xy:", tex: T`\frac{\Delta (xy)}{xy}=\frac{\Delta y}{y}+\frac{\Delta x}{x}` },
          { text: "For a quotient x/y the worst case is the same: uncertainties still add. For x², put y = x, giving 2Δx/x." }],
        misconceptions: ["Subtracting uncertainties when dividing: they always add.", "Adding percentage uncertainties when quantities are added or subtracted: in that case add the absolute uncertainties."],
        tips: ["Paper 3-style questions also appear on Paper 2: for a graph gradient, use the worst acceptable line.", "Quote final uncertainties to 1 significant figure (2 if it starts with 1)."] }] }] },

  { id: 2, title: "Kinematics", strand: "Mechanics", topics: [
    { id: "suvat", name: "Equations of uniformly accelerated motion", formulas: [
      { id: "vuat", name: "Velocity–time equation", tex: T`v = u + at`,
        vars: [[T`u`, "initial velocity", "m s⁻¹"], [T`v`, "final velocity", "m s⁻¹"], [T`a`, "acceleration", "m s⁻²"], [T`t`, "time", "s"]],
        conditions: "Constant acceleration in a straight line.",
        steps: [
          { text: "Acceleration is defined as the rate of change of velocity:", tex: T`a=\frac{\Delta v}{\Delta t}` },
          { text: "Over time t, velocity changes from u to v, so Δv = v − u and Δt = t:", tex: T`a=\frac{v-u}{t}` },
          { text: "Multiply by t and rearrange:", tex: T`at = v-u\;\Rightarrow\; v=u+at` },
          { text: "Because a is constant, the v–t graph is a straight line of gradient a and y-intercept u." }],
        misconceptions: ["Applying it to a whole journey in which acceleration changes (e.g. a lift that speeds up, cruises, then stops): split into stages.", "Mixing signs: choose a positive direction and keep to it."],
        tips: ["Write out s, u, v, a, t and mark the unknown before choosing an equation.", "At the top of a projectile's vertical path v = 0 but a = −g."] },
      { id: "sut", name: "Displacement–time equation", tex: T`s = ut + \tfrac12 at^2`,
        vars: [[T`s`, "displacement", "m"], [T`u`, "initial velocity", "m s⁻¹"], [T`a`, "acceleration", "m s⁻²"], [T`t`, "time", "s"]],
        conditions: "Constant acceleration in a straight line.",
        steps: [
          { text: "Displacement is average velocity multiplied by time:", tex: T`s=v_{av}\,t` },
          { text: "With constant acceleration, velocity changes linearly, so the average is the mean of the start and end values:", tex: T`v_{av}=\frac{u+v}{2}` },
          { text: "Substitute v = u + at:", tex: T`v_{av}=\frac{u+(u+at)}{2}=u+\tfrac12 at` },
          { text: "Therefore:", tex: T`s=\left(u+\tfrac12at\right)t=ut+\tfrac12at^2` },
          { text: "Geometrically, s is the area under the v–t graph: a rectangle ut plus a triangle ½(at)t." }],
        misconceptions: ["Believing the ½ belongs to the ut term.", "Using s for distance travelled when the object reverses direction: s is displacement."],
        tips: ["Dropping from rest: u = 0 so s = ½gt².", "Quadratic in t: reject the negative root only if it makes physical sense."] },
      { id: "vsq", name: "Velocity–displacement equation", tex: T`v^2 = u^2 + 2as`,
        vars: [[T`v,u`, "final and initial velocity", "m s⁻¹"], [T`a`, "acceleration", "m s⁻²"], [T`s`, "displacement", "m"]],
        conditions: "Constant acceleration in a straight line; time not needed.",
        steps: [
          { text: "Start from v = u + at and from s = ½(u + v)t." },
          { text: "Eliminate t using t = (v − u)/a in the second:", tex: T`s=\frac{(u+v)(v-u)}{2a}` },
          { text: "Expand the difference of squares:", tex: T`2as=v^2-u^2` },
          { text: "Rearrange:", tex: T`v^2=u^2+2as` }],
        misconceptions: ["Forgetting v² is positive even if v is negative; take ± square root and use context.", "Using it when acceleration varies."],
        tips: ["Use whenever t is neither given nor wanted.", "Stopping distance: v = 0 gives s = −u²/2a; doubling speed quadruples braking distance."] }] },
    { id: "projectile", name: "Projectile motion", formulas: [
      { id: "range", name: "Horizontal range (level ground)", tex: T`R=\frac{u^2\sin 2\theta}{g}`,
        vars: [[T`R`, "horizontal range", "m"], [T`u`, "launch speed", "m s⁻¹"], [T`\theta`, "launch angle above horizontal", "°"], [T`g`, "free-fall acceleration", "m s⁻²"]],
        conditions: "No air resistance; launch and landing at same height; uniform g.",
        steps: [
          { text: "Resolve the launch velocity: horizontal u cosθ (constant), vertical u sinθ (acceleration −g).", tex: T`u_x=u\cos\theta,\quad u_y=u\sin\theta` },
          { text: "Vertical displacement is zero on landing, so 0 = u_y t − ½gt². The non-zero root is the time of flight:", tex: T`t=\frac{2u\sin\theta}{g}` },
          { text: "Horizontal motion is uniform, so R = u_x t:", tex: T`R=u\cos\theta\cdot\frac{2u\sin\theta}{g}` },
          { text: "Use 2 sinθ cosθ = sin 2θ:", tex: T`R=\frac{u^2\sin2\theta}{g}` }],
        misconceptions: ["Thinking the horizontal velocity decreases during flight: with no air resistance it is constant.", "Assuming a heavier projectile lands sooner: g is independent of mass."],
        tips: ["Treat horizontal and vertical motion separately; time is the link.", "Maximum range is at 45° only for equal launch and landing heights."] }] }] },

  { id: 3, title: "Dynamics", strand: "Mechanics", topics: [
    { id: "newton", name: "Newton's laws and momentum", formulas: [
      { id: "fma", name: "Newton's second law", tex: T`F=ma`,
        vars: [[T`F`, "resultant force", "N"], [T`m`, "mass", "kg"], [T`a`, "acceleration", "m s⁻²"]],
        conditions: "Constant mass; F is the resultant force; non-relativistic speeds.",
        steps: [
          { text: "Newton's second law: resultant force equals rate of change of momentum, with p = mv:", tex: T`F=\frac{\Delta p}{\Delta t}=\frac{\Delta(mv)}{\Delta t}` },
          { text: "For constant mass, m can be taken outside the change:", tex: T`F=m\frac{\Delta v}{\Delta t}` },
          { text: "Δv/Δt is acceleration:", tex: T`F=ma` },
          { text: "This also defines the newton: 1 N is the force giving a 1 kg mass an acceleration of 1 m s⁻²." }],
        misconceptions: ["Using one of several forces for F rather than the resultant.", "Believing a force is needed to maintain constant velocity; zero resultant gives zero acceleration."],
        tips: ["Draw a free-body diagram and state the direction taken as positive.", "Rocket or conveyor-belt problems with changing mass need F = Δp/Δt."] },
      { id: "elastic", name: "Elastic collision: relative speed", tex: T`u_1-u_2=v_2-v_1`,
        vars: [[T`u_1,u_2`, "velocities before collision", "m s⁻¹"], [T`v_1,v_2`, "velocities after collision", "m s⁻¹"]],
        conditions: "Perfectly elastic collision in one dimension (kinetic energy conserved).",
        steps: [
          { text: "Momentum is conserved:", tex: T`m_1u_1+m_2u_2=m_1v_1+m_2v_2` },
          { text: "Kinetic energy is conserved:", tex: T`\tfrac12m_1u_1^2+\tfrac12m_2u_2^2=\tfrac12m_1v_1^2+\tfrac12m_2v_2^2` },
          { text: "Rearrange each so that the m₁ terms are on one side and the m₂ terms on the other:", tex: T`m_1(u_1-v_1)=m_2(v_2-u_2),\qquad m_1(u_1^2-v_1^2)=m_2(v_2^2-u_2^2)` },
          { text: "Divide the energy equation by the momentum equation. Using a² − b² = (a − b)(a + b), the m and (u − v) factors cancel:", tex: T`u_1+v_1=v_2+u_2` },
          { text: "Rearrange: relative speed of approach equals relative speed of separation.", tex: T`u_1-u_2=v_2-v_1` }],
        misconceptions: ["Applying it to inelastic collisions: there, separation speed is less than approach speed.", "Thinking momentum is lost in an inelastic collision; only kinetic energy is."],
        tips: ["Test elasticity: compare relative speeds, or compare total kinetic energy before and after.", "Momentum is a vector: sign matters in head-on collisions."] }] }] },

  { id: 4, title: "Forces, Density and Pressure", strand: "Mechanics", topics: [
    { id: "pressure", name: "Pressure in fluids and upthrust", formulas: [
      { id: "rgh", name: "Hydrostatic pressure", tex: T`p=\rho g h`,
        vars: [[T`p`, "pressure due to the liquid", "Pa (N m⁻²)"], [T`\rho`, "density", "kg m⁻³"], [T`g`, "gravitational field strength", "N kg⁻¹"], [T`h`, "depth below the surface", "m"]],
        conditions: "Fluid at rest, constant density, uniform g. Add atmospheric pressure for the total.",
        steps: [
          { text: "Pressure is force per unit area:", tex: T`p=\frac{F}{A}` },
          { text: "Consider a column of liquid of cross-section A and height h above the point. Its volume is V = Ah, so its mass is:", tex: T`m=\rho V=\rho Ah` },
          { text: "The force on the base is the column's weight:", tex: T`F=mg=\rho Ahg` },
          { text: "Divide by A; the area cancels:", tex: T`p=\frac{\rho Ahg}{A}=\rho g h` }],
        misconceptions: ["Pressure depends on container shape or total volume: only depth, density and g matter.", "Forgetting atmospheric pressure when the question asks for the total pressure."],
        tips: ["Pressure difference between two depths: Δp = ρgΔh.", "Pressure at a given depth acts equally in all directions."] },
      { id: "upthrust", name: "Upthrust (Archimedes' principle)", tex: T`U=\rho_f V_{disp}\,g`,
        vars: [[T`U`, "upthrust", "N"], [T`\rho_f`, "fluid density", "kg m⁻³"], [T`V_{disp}`, "volume of fluid displaced", "m³"], [T`g`, "gravitational field strength", "N kg⁻¹"]],
        conditions: "Object wholly or partly immersed in a fluid at rest.",
        steps: [
          { text: "Take a cuboid of height h and area A fully submerged, its top face at depth h₁ and bottom at h₂ = h₁ + h." },
          { text: "Forces from the fluid on the top (down) and bottom (up) faces:", tex: T`F_{top}=\rho g h_1A,\qquad F_{bottom}=\rho g h_2A` },
          { text: "Side forces cancel by symmetry, so the net upward force is:", tex: T`U=\rho gA(h_2-h_1)=\rho g Ah` },
          { text: "Ah is the volume of the cuboid, equal to the volume of fluid displaced:", tex: T`U=\rho_f V_{disp}g=\text{weight of fluid displaced}` }],
        misconceptions: ["Upthrust depends on the object's weight or density: only on the fluid displaced.", "A floating object has upthrust greater than its weight: it equals the weight."],
        tips: ["Origin of upthrust: pressure increases with depth, so the lower face feels a larger force.", "Floating: U = W, so ρ_f V_disp = ρ_object V_object."] }] },
    { id: "moments", name: "Moments and equilibrium", formulas: [
      { id: "couple", name: "Torque of a couple", tex: T`\tau = F\,d`,
        vars: [[T`\tau`, "torque of the couple", "N m"], [T`F`, "magnitude of one of the two forces", "N"], [T`d`, "perpendicular distance between the lines of action", "m"]],
        conditions: "Two equal, antiparallel forces with different lines of action.",
        steps: [
          { text: "A couple is two equal and opposite forces F whose lines of action are a distance d apart. The resultant force is zero." },
          { text: "Take moments about any point P, at distance x from the nearer force's line. The two moments act in the same turning sense:", tex: T`\tau=F x+F(d-x)` },
          { text: "x cancels, so the torque is independent of the pivot:", tex: T`\tau=Fd` }],
        misconceptions: ["A couple produces translation: its resultant force is zero, so only rotation.", "Using the length of a spanner instead of the perpendicular distance between forces."],
        tips: ["In equilibrium: resultant force = 0 and the sum of clockwise moments = the sum of anticlockwise moments about any point.", "Choose a pivot that eliminates the unknown force."] }] }] },

  { id: 5, title: "Work, Energy and Power", strand: "Mechanics", topics: [
    { id: "energy", name: "Work, kinetic and potential energy", formulas: [
      { id: "work", name: "Work done by a force", tex: T`W=Fs\cos\theta`,
        vars: [[T`W`, "work done", "J"], [T`F`, "force", "N"], [T`s`, "displacement", "m"], [T`\theta`, "angle between F and s", "°"]],
        conditions: "Constant force; s is displacement along the line of motion.",
        steps: [
          { text: "Work is the force component in the direction of motion multiplied by the displacement." },
          { text: "Resolve F along s:", tex: T`F_\parallel=F\cos\theta` },
          { text: "Multiply:", tex: T`W=F_\parallel s=Fs\cos\theta` },
          { text: "At θ = 90° no work is done (e.g. centripetal force)." }],
        misconceptions: ["A force always does work: none if there is no displacement or the force is perpendicular to it.", "Mixing up work and power."],
        tips: ["Area under a force–displacement graph is work done.", "The joule: 1 J = 1 N m = 1 kg m² s⁻²."] },
      { id: "ek", name: "Kinetic energy", tex: T`E_k=\tfrac12mv^2`,
        vars: [[T`E_k`, "kinetic energy", "J"], [T`m`, "mass", "kg"], [T`v`, "speed", "m s⁻¹"]],
        conditions: "Non-relativistic speeds.",
        steps: [
          { text: "Accelerate a mass m from rest to v over a distance s with constant force F. Work done:", tex: T`W=Fs=mas` },
          { text: "From v² = u² + 2as with u = 0, as = v²/2:", tex: T`W=m\cdot\frac{v^2}{2}` },
          { text: "By conservation of energy this work is stored as kinetic energy:", tex: T`E_k=\tfrac12mv^2` }],
        misconceptions: ["Doubling speed doubles kinetic energy: it quadruples it.", "Kinetic energy is a vector: it is scalar and never negative."],
        tips: ["Link to momentum: E_k = p²/2m.", "Use energy methods when the path or time is unknown."] },
      { id: "gpe", name: "Change in gravitational potential energy", tex: T`\Delta E_p=mg\Delta h`,
        vars: [[T`m`, "mass", "kg"], [T`g`, "gravitational field strength", "N kg⁻¹"], [T`\Delta h`, "change in height", "m"]],
        conditions: "Near the Earth's surface, where g is uniform.",
        steps: [
          { text: "To raise an object at constant speed, the lifting force equals its weight:", tex: T`F=mg` },
          { text: "Work done against gravity through a vertical height Δh (force parallel to displacement):", tex: T`W=F\Delta h=mg\Delta h` },
          { text: "This work is stored as gravitational potential energy:", tex: T`\Delta E_p=mg\Delta h` }],
        misconceptions: ["Path matters: only vertical height change counts.", "Using the length along a slope instead of the vertical height."],
        tips: ["Falling: mgΔh = ½mv² − ½mu² when air resistance is negligible.", "Energy lost to friction appears as thermal energy."] }] },
    { id: "power", name: "Power", formulas: [
      { id: "pfv", name: "Power and velocity", tex: T`P=Fv`,
        vars: [[T`P`, "power", "W"], [T`F`, "driving force", "N"], [T`v`, "constant velocity", "m s⁻¹"]],
        conditions: "Force parallel to the velocity; constant force over the interval considered.",
        steps: [
          { text: "Power is the rate of doing work:", tex: T`P=\frac{W}{t}` },
          { text: "For a force parallel to the motion, W = Fs:", tex: T`P=\frac{Fs}{t}` },
          { text: "Distance divided by time is velocity:", tex: T`P=F\frac{s}{t}=Fv` }],
        misconceptions: ["Greater power means more energy: it means energy transferred faster.", "A car at maximum speed has zero driving force: the driving force equals the drag."],
        tips: ["At top speed, F = drag, so P = Fv gives the drag-force power.", "Efficiency = useful output ÷ total input, as a fraction or percentage."] }] }] },

  { id: 6, title: "Deformation of Solids", strand: "Mechanics", topics: [
    { id: "elastic-solids", name: "Hooke's law, strain energy, Young modulus", formulas: [
      { id: "ee", name: "Elastic potential energy", tex: T`E=\tfrac12Fx=\tfrac12kx^2`,
        vars: [[T`E`, "elastic (strain) energy", "J"], [T`F`, "force", "N"], [T`x`, "extension", "m"], [T`k`, "force constant", "N m⁻¹"]],
        conditions: "Within the limit of proportionality (Hooke's law region).",
        steps: [
          { text: "Work done stretching = area under the force–extension graph. In the Hooke region F = kx, a straight line through the origin." },
          { text: "The area is a triangle of base x and height F:", tex: T`E=\tfrac12Fx` },
          { text: "Substitute F = kx:", tex: T`E=\tfrac12kx^2` }],
        misconceptions: ["Using E = Fx: that overestimates, since the force grows from zero.", "Applying it beyond the limit of proportionality, where the graph is curved."],
        tips: ["For non-linear graphs count squares.", "Area between loading and unloading curves is energy dissipated as heat."] },
      { id: "ym", name: "Young modulus and force constant", tex: T`E=\frac{\sigma}{\varepsilon}=\frac{FL}{Ax},\quad k=\frac{EA}{L}`,
        vars: [[T`\sigma=F/A`, "stress", "Pa"], [T`\varepsilon=x/L`, "strain", "no unit"], [T`E`, "Young modulus", "Pa"], [T`k`, "force constant", "N m⁻¹"]],
        conditions: "Wire or rod within the limit of proportionality; uniform cross-section.",
        steps: [
          { text: "Stress is force per unit cross-sectional area and strain is extension per unit original length:", tex: T`\sigma=\frac{F}{A},\qquad \varepsilon=\frac{x}{L}` },
          { text: "In the Hooke region stress ∝ strain; the constant is the Young modulus:", tex: T`E=\frac{\sigma}{\varepsilon}=\frac{F/A}{x/L}=\frac{FL}{Ax}` },
          { text: "Rearrange for F and compare with F = kx:", tex: T`F=\frac{EA}{L}x\;\Rightarrow\;k=\frac{EA}{L}` }],
        misconceptions: ["Young modulus depends on the sample's size: it is a material property (stiffness depends on size via k).", "Mixing area units: convert mm² to m² (×10⁻⁶)."],
        tips: ["Experiment: plot F against x, gradient = k = EA/L; measure d with a micrometer for A = πd²/4.", "Uncertainty in diameter dominates since A ∝ d²."] }] }] },

  { id: 7, title: "Waves", strand: "Waves", topics: [
    { id: "wave-eq", name: "Wave speed, intensity and polarisation", formulas: [
      { id: "vfl", name: "Wave equation", tex: T`v=f\lambda`,
        vars: [[T`v`, "wave speed", "m s⁻¹"], [T`f`, "frequency", "Hz"], [T`\lambda`, "wavelength", "m"]],
        conditions: "Any progressive wave in a uniform medium.",
        steps: [
          { text: "In one period T the wave pattern advances exactly one wavelength λ:", tex: T`v=\frac{\text{distance}}{\text{time}}=\frac{\lambda}{T}` },
          { text: "Frequency is the reciprocal of the period:", tex: T`f=\frac1T` },
          { text: "Substitute:", tex: T`v=f\lambda` }],
        misconceptions: ["Frequency changes on refraction: it is set by the source; speed and wavelength change.", "Wave speed is the particle speed: particles oscillate, only the pattern advances."],
        tips: ["On refraction f is constant, so v₁/λ₁ = v₂/λ₂.", "Read λ from a displacement–distance graph and T from a displacement–time graph."] },
      { id: "iA2", name: "Intensity and amplitude", tex: T`I=\frac{P}{A}\propto a^2`,
        vars: [[T`I`, "intensity", "W m⁻²"], [T`P`, "power", "W"], [T`A`, "area", "m²"], [T`a`, "amplitude", "m"]],
        conditions: "Power received perpendicular to the area; point source: I ∝ 1/r².",
        steps: [
          { text: "Intensity is power per unit area:", tex: T`I=\frac{P}{A}` },
          { text: "A wave's energy is proportional to the square of its amplitude: oscillation energy E = ½mω²a²." },
          { text: "Power is energy per unit time, so I ∝ a². For a point source spreading over a sphere:", tex: T`I=\frac{P}{4\pi r^2}\;\Rightarrow\;a\propto\frac1r` }],
        misconceptions: ["Doubling amplitude doubles intensity: it quadruples it.", "Intensity falls as 1/r: it is 1/r² for a point source."],
        tips: ["Ratio questions: I₂/I₁ = (a₂/a₁)².", "Write the intensity ratio before substituting numbers."] },
      { id: "malus", name: "Malus's law", tex: T`I=I_0\cos^2\theta`,
        vars: [[T`I_0`, "intensity of plane-polarised light incident on analyser", "W m⁻²"], [T`I`, "transmitted intensity", "W m⁻²"], [T`\theta`, "angle between polarisation direction and analyser axis", "°"]],
        conditions: "Plane-polarised light incident on an ideal polarising filter.",
        steps: [
          { text: "Amplitude a₀ of the incident wave is resolved into components parallel and perpendicular to the analyser's axis." },
          { text: "Only the parallel component passes:", tex: T`a=a_0\cos\theta` },
          { text: "Intensity ∝ amplitude², so:", tex: T`I=I_0\cos^2\theta` }],
        misconceptions: ["Sound can be polarised: only transverse waves can.", "Unpolarised light through one filter loses all intensity: it loses half."],
        tips: ["Crossed polarisers (θ = 90°) transmit nothing.", "Rotating an analyser through 360° gives two maxima and two minima."] }] }] },

  { id: 8, title: "Superposition", strand: "Waves", topics: [
    { id: "interference", name: "Interference and diffraction", formulas: [
      { id: "phase", name: "Phase difference and path difference", tex: T`\Delta\phi=\frac{2\pi\,\Delta x}{\lambda}`,
        vars: [[T`\Delta\phi`, "phase difference", "rad"], [T`\Delta x`, "path difference", "m"], [T`\lambda`, "wavelength", "m"]],
        conditions: "Two coherent waves of the same wavelength.",
        steps: [
          { text: "One wavelength of path difference corresponds to one full cycle, 2π rad." },
          { text: "A path difference of Δx is the fraction Δx/λ of a cycle:", tex: T`\frac{\Delta\phi}{2\pi}=\frac{\Delta x}{\lambda}` },
          { text: "Rearrange:", tex: T`\Delta\phi=\frac{2\pi\,\Delta x}{\lambda}` },
          { text: "Constructive interference needs Δx = nλ, destructive Δx = (n + ½)λ." }],
        misconceptions: ["Destructive interference destroys energy: it is redistributed to the maxima.", "Using a phase difference in degrees inside a radian formula."],
        tips: ["Coherence needs a constant phase difference and the same frequency.", "At a minimum, Δx = (n + ½)λ."] },
      { id: "dslit", name: "Double-slit interference", tex: T`\lambda=\frac{ax}{D}`,
        vars: [[T`\lambda`, "wavelength", "m"], [T`a`, "slit separation", "m"], [T`x`, "fringe separation", "m"], [T`D`, "slits-to-screen distance", "m"]],
        conditions: "Coherent slits; D ≫ a; small angles so sinθ ≈ tanθ ≈ θ.",
        steps: [
          { text: "A bright fringe at angle θ has a path difference between the two slits:", tex: T`\Delta=a\sin\theta` },
          { text: "For the nth bright fringe Δ = nλ. Adjacent fringes (n and n+1) differ by one wavelength in path difference:", tex: T`a\,\Delta(\sin\theta)=\lambda` },
          { text: "For small angles, sinθ ≈ tanθ = y/D, so adjacent fringes separated by x give Δ(sinθ) = x/D:", tex: T`a\cdot\frac{x}{D}=\lambda` },
          { text: "Rearrange:", tex: T`\lambda=\frac{ax}{D}` }],
        misconceptions: ["Fringe separation increases with slit separation: it decreases.", "Fringes are formed by a single source with one slit: two coherent sources are needed."],
        tips: ["Measure across several fringes and divide for x to reduce uncertainty.", "Red light gives wider fringes than blue."] },
      { id: "grating", name: "Diffraction grating", tex: T`d\sin\theta=n\lambda`,
        vars: [[T`d`, "grating spacing (1/lines per metre)", "m"], [T`\theta`, "angle of nth order", "°"], [T`n`, "order of maximum", "integer"], [T`\lambda`, "wavelength", "m"]],
        conditions: "Monochromatic light at normal incidence on a plane transmission grating.",
        steps: [
          { text: "Light from adjacent slits, separation d, travels to a distant point at angle θ. The path difference is:", tex: T`\Delta=d\sin\theta` },
          { text: "A maximum requires every pair of adjacent slits to be in phase, so the path difference is a whole number of wavelengths:", tex: T`d\sin\theta=n\lambda` },
          { text: "The largest order satisfies sinθ ≤ 1, so n_max = ⌊d/λ⌋." }],
        misconceptions: ["Using the number of lines per mm as d without converting: d = 1/N.", "Counting the central maximum as the first order: it is n = 0."],
        tips: ["Convert N lines per mm: d = 10⁻³/N metres.", "Maximum orders: use sinθ = 1, and round the result down."] }] }] },

  { id: 9, title: "Electricity", strand: "D.C. Circuits", topics: [
    { id: "charge", name: "Charge, current, resistance", formulas: [
      { id: "iq", name: "Current as rate of flow of charge", tex: T`I=\frac{\Delta Q}{\Delta t}`,
        vars: [[T`I`, "current", "A"], [T`Q`, "charge", "C"], [T`t`, "time", "s"]],
        conditions: "Defined for any conductor; for charged particles of charge e, Q = Ne.",
        steps: [
          { text: "Current is the rate of flow of charge past a point:", tex: T`I=\frac{\Delta Q}{\Delta t}` },
          { text: "Charge is quantised: N electrons carry Q = Ne, with e = 1.60 × 10⁻¹⁹ C." },
          { text: "Hence 1 ampere is 1 coulomb per second; the coulomb is a derived unit, 1 C = 1 A s." }],
        misconceptions: ["Current is used up in a component: charge is conserved, so current is the same through components in series.", "Conventional current direction equals electron flow: it is opposite."],
        tips: ["Area under an I–t graph is charge transferred.", "Ammeters in series, with very low resistance."] },
      { id: "iAnvq", name: "Drift velocity equation", tex: T`I=Anvq`,
        vars: [[T`I`, "current", "A"], [T`A`, "cross-sectional area", "m²"], [T`n`, "charge carriers per unit volume", "m⁻³"], [T`v`, "mean drift velocity", "m s⁻¹"], [T`q`, "charge on each carrier", "C"]],
        conditions: "Uniform conductor with a single type of charge carrier.",
        steps: [
          { text: "In time Δt every carrier within a length vΔt of a cross-section passes through it. The volume of that segment is:", tex: T`V=Av\Delta t` },
          { text: "Number of carriers in it, with n per unit volume:", tex: T`N=nAv\Delta t` },
          { text: "Total charge crossing in Δt:", tex: T`\Delta Q=nAv\Delta t\,q` },
          { text: "Divide by Δt:", tex: T`I=\frac{\Delta Q}{\Delta t}=Anvq` }],
        misconceptions: ["Electrons move at the speed of light: drift velocity is of the order of mm s⁻¹; the field propagates quickly.", "Thinner wire means smaller current at the same drift speed: a thinner wire has a larger drift speed for the same current."],
        tips: ["Metals have large n; semiconductors have small n so larger v for the same I.", "Same I through different areas: v ∝ 1/A."] },
      { id: "vwq", name: "Potential difference and EMF", tex: T`V=\frac{W}{Q}`,
        vars: [[T`V`, "p.d. (or EMF E)", "V"], [T`W`, "electrical energy transferred", "J"], [T`Q`, "charge", "C"]],
        conditions: "p.d.: electrical to other forms; EMF: other forms to electrical.",
        steps: [
          { text: "The p.d. across a component is the energy transferred from electrical to other forms per unit charge passing through it:", tex: T`V=\frac{W}{Q}` },
          { text: "One volt is one joule per coulomb, 1 V = 1 J C⁻¹." },
          { text: "EMF is the same quotient with W being the energy converted from chemical (or other) to electrical per unit charge, round the complete circuit." }],
        misconceptions: ["EMF is a force: it is energy per unit charge.", "EMF and terminal p.d. are always equal: they are equal only when no current flows."],
        tips: ["Define p.d. and EMF in energy-per-charge terms.", "Work done by a source: W = EQ = EIt."] },
      { id: "res", name: "Resistance and resistivity", tex: T`R=\frac{V}{I},\quad R=\frac{\rho L}{A}`,
        vars: [[T`R`, "resistance", "Ω"], [T`\rho`, "resistivity", "Ω m"], [T`L`, "length", "m"], [T`A`, "cross-sectional area", "m²"]],
        conditions: "Ohm's law (V ∝ I) requires an ohmic conductor at constant temperature; R = V/I defines resistance always.",
        steps: [
          { text: "Resistance is defined as p.d. per unit current:", tex: T`R=\frac{V}{I}` },
          { text: "Experiment shows that for a uniform wire R ∝ L (more atoms to collide with in series) and R ∝ 1/A (more parallel paths)." },
          { text: "Combine with a constant of proportionality ρ, which is a property of the material:", tex: T`R=\frac{\rho L}{A}` }],
        misconceptions: ["Resistance changes with p.d.: for an ohmic conductor it does not; for a filament lamp it increases with temperature.", "Halving the diameter doubles R: it quadruples it, since A ∝ d²."],
        tips: ["For the I–V curve of a filament lamp, R = V/I at each point (not the tangent gradient).", "Thermistor (NTC): R decreases as temperature rises."] },
      { id: "pvi", name: "Electrical power", tex: T`P=VI=I^2R=\frac{V^2}{R}`,
        vars: [[T`P`, "power", "W"], [T`V`, "p.d.", "V"], [T`I`, "current", "A"], [T`R`, "resistance", "Ω"]],
        conditions: "P = VI always; the other forms need V = IR (resistive component).",
        steps: [
          { text: "Energy transferred is W = VQ, and Q = It:", tex: T`W=VIt` },
          { text: "Power is energy per unit time:", tex: T`P=\frac Wt=VI` },
          { text: "Use V = IR to eliminate V or I:", tex: T`P=I^2R,\qquad P=\frac{V^2}{R}` }],
        misconceptions: ["Higher resistance always means more power: depends on whether I or V is held constant.", "Mains lamp 60 W has a fixed resistance: it varies with temperature."],
        tips: ["Transmission at high voltage: lower I means lower I²R loss.", "kWh is an energy unit: 3.6 × 10⁶ J."] }] }] },

  { id: 10, title: "D.C. Circuits", strand: "D.C. Circuits", topics: [
    { id: "combos", name: "Resistor combinations and potential divider", formulas: [
      { id: "series", name: "Resistors in series", tex: T`R_{total}=R_1+R_2+\cdots`,
        vars: [[T`R_i`, "individual resistances", "Ω"]],
        conditions: "Components in a single path; same current through each.",
        steps: [
          { text: "Same current I flows through each resistor (charge conservation)." },
          { text: "The source EMF equals the sum of the p.d.s (energy conservation per coulomb):", tex: T`V=V_1+V_2=IR_1+IR_2` },
          { text: "Compare with V = IR_total:", tex: T`R_{total}=R_1+R_2` }],
        misconceptions: ["Total resistance falls when adding series resistors: it rises."],
        tips: ["Series: current shared, p.d. split."] },
      { id: "parallel", name: "Resistors in parallel", tex: T`\frac1{R_{total}}=\frac1{R_1}+\frac1{R_2}+\cdots`,
        vars: [[T`R_i`, "individual resistances", "Ω"]],
        conditions: "Branches connected across the same two points; same p.d. across each.",
        steps: [
          { text: "The p.d. V across each branch is the same. Currents divide, and by Kirchhoff's first law:", tex: T`I=I_1+I_2` },
          { text: "Use I = V/R for each:", tex: T`\frac{V}{R_{total}}=\frac V{R_1}+\frac V{R_2}` },
          { text: "Divide by V:", tex: T`\frac1{R_{total}}=\frac1{R_1}+\frac1{R_2}` }],
        misconceptions: ["Total parallel resistance exceeds the largest branch: it is smaller than the smallest."],
        tips: ["Two resistors: R = R₁R₂/(R₁ + R₂).", "n identical resistors: R/n."] },
      { id: "divider", name: "Potential divider", tex: T`V_{out}=\frac{R_2}{R_1+R_2}V_{in}`,
        vars: [[T`V_{in}`, "supply p.d.", "V"], [T`V_{out}`, "p.d. across R₂", "V"], [T`R_1,R_2`, "series resistors", "Ω"]],
        conditions: "No current drawn by the load, or the load resistance is much larger than R₂.",
        steps: [
          { text: "Series current through both resistors:", tex: T`I=\frac{V_{in}}{R_1+R_2}` },
          { text: "The p.d. across R₂ is IR₂:", tex: T`V_{out}=IR_2=\frac{R_2}{R_1+R_2}V_{in}` }],
        misconceptions: ["Connecting a load changes nothing: the load in parallel with R₂ lowers V_out."],
        tips: ["Sensor circuits: replace R₂ with a thermistor or LDR."] },
      { id: "kcl", name: "Kirchhoff's first law", tex: T`\sum I_{in}=\sum I_{out}`,
        vars: [[T`I_{in}`, "currents into a junction", "A"], [T`I_{out}`, "currents out of a junction", "A"]],
        conditions: "Any junction in a steady d.c. circuit.",
        steps: [
          { text: "Charge cannot accumulate at a junction in a steady state." },
          { text: "Charge arriving per second equals charge leaving per second:", tex: T`\frac{\Delta Q_{in}}{\Delta t}=\frac{\Delta Q_{out}}{\Delta t}` },
          { text: "Therefore:", tex: T`\sum I_{in}=\sum I_{out}` }],
        misconceptions: ["Current is lost when it passes a resistor: only energy is."],
        tips: ["State: conservation of charge. Use for branch current calculations."] },
      { id: "kvl", name: "Kirchhoff's second law", tex: T`\sum E=\sum IR`,
        vars: [[T`E`, "EMFs around the loop (signed)", "V"], [T`IR`, "p.d.s around the loop (signed)", "V"]],
        conditions: "Any closed loop of a circuit.",
        steps: [
          { text: "Energy is conserved: a unit charge completing a loop gains energy from the EMFs and loses the same amount in the resistances." },
          { text: "Therefore, around any closed loop:", tex: T`\sum E=\sum IR` },
          { text: "Sign convention: choose a loop direction; an EMF is positive if it drives current in that direction; IR is positive if I is in that direction." }],
        misconceptions: ["Sign errors from mixed conventions: fix direction first."],
        tips: ["State: conservation of energy. Write each loop, then use the first law to cut unknowns."] },
      { id: "internal", name: "EMF and internal resistance", tex: T`E=I(R+r),\quad V=E-Ir`,
        vars: [[T`E`, "EMF", "V"], [T`r`, "internal resistance", "Ω"], [T`R`, "external (load) resistance", "Ω"], [T`V`, "terminal p.d.", "V"]],
        conditions: "A real source driving a steady current through an external load.",
        steps: [
          { text: "Apply Kirchhoff's second law to the loop: the EMF equals the sum of the p.d.s across external and internal resistances.", tex: T`E=IR+Ir` },
          { text: "IR is the terminal p.d. V across the load:", tex: T`E=V+Ir` },
          { text: "Rearrange:", tex: T`V=E-Ir` },
          { text: "A plot of V against I is a straight line: intercept E, gradient −r. Lost volts Ir is energy per coulomb dissipated inside the cell." }],
        misconceptions: ["Terminal p.d. equals EMF under load: it is lower by Ir.", "Short circuit current is infinite: it is E/r."],
        tips: ["Maximum power to the load when R = r.", "Experiments: plot V against I, then E = y-intercept, r = −gradient."] }] }] },
];

export const flat = units.flatMap((u) =>
  u.topics.flatMap((t) => t.formulas.map((f) => ({ ...f, unit: u.id, unitTitle: u.title, strand: u.strand, topic: t.name }))));
