extends Node2D

# Константы
const CIRCLE = {
	"position": Vector2(500, 315),
	"radius": 45,
}
const RAY = {
	"position": Vector2(700, 200),
}

# Функция рисования луча (имитирует бесконечный луч, только в направлении от точки)
func draw_ray(pos: Vector2, dir: float, color: Color, width: float = 1.0, antialiased: bool = false) -> void:
	var to_point = pos + Vector2(cos(deg2rad(dir)), sin(deg2rad(dir))) * 5000
	draw_line(pos, to_point, color, width, antialiased)

# Функция решения квадратного уравнения
func quadratic_equation(a: float, b: float, c: float) -> Array:
	
	var D = b * b - 4 * a * c;
	
	if sign(D) == -1:
		return []
	
	var rD = sqrt(D)
	var x = (-b + rD) / 2 * a
	var y = (-b - rD) / 2 * a
	
	return [x, y]

# 
var mouse_point: Vector2
var ray_direction: Vector2
var direction: float

func _ready():
	mouse_point = Vector2()

func _physics_process(delta):
	mouse_point = get_global_mouse_position()
	ray_direction = RAY.position.direction_to(mouse_point)
	direction = rad2deg(ray_direction.angle())
	
	update()

func _draw():
	draw_circle(CIRCLE.position, CIRCLE.radius, Color(255, 0, 0))
	draw_ray(RAY.position, direction, Color(0, 255, 0))
	draw_ray(RAY.position, direction + 180, Color(0, 0, 255))
	
	# Уравнение окружности
	# cr^2 = (x - cx0)^2 + (y - cy0)^2
	# Уравнения луча
	# rx = t * rdx + rx0
	# ry = t * rdy + ry0
	
	# Уравнения пересечения луча и окружности
	# (t * rdx + rx0 - cx0)^2 + (t * rdy + ry0 - cy0)^2 - cr^2 = 0
	
	# SX = rx0 - cx0
	# SY = ry0 - cy0
	# (t * rdx + SX)^2 + (t * rdy + SY)^2 - cr^2 = 0
	
	# t^2 * rdx^2 + 2 * t * rdx * SX + SX^2   +   t^2 * rdy^2 + 2 * t * rdy * SY + SY^2   -   cr^2 = 0
	
	# C1X = rdx^2
	# C1Y = rdy^2
	# C2X = 2 * rdx * SX
	# C2Y = 2 * rdy * SY
	# C3X = SX^2
	# C3Y = SY^2
	# C1X * t^2 + C2X * t + C3X   +   C1Y * t^2 + C2Y * t + C3Y   -   cr^2 = 0
	# (C1X + C1Y) * t^2 + (C2X + C2Y) * t + (C3X + C3Y - cr^2) * 1 = 0
	
	# C1 = C1X + C1Y
	# C2 = C2X + C2Y
	# C3 = C3X + C3Y - cr^2
	# C1 * t^2 + C2 * t + C3 = 0
	
	var cr = CIRCLE.radius;
	var cx0 = CIRCLE.position.x;
	var cy0 = CIRCLE.position.y;
	
	var rx0 = RAY.position.x;
	var ry0 = RAY.position.y;
	var rdx = ray_direction.x; # нормализированное направление луча
	var rdy = ray_direction.y;
	
	var SX = rx0 - cx0
	var SY = ry0 - cy0
	var C1 = rdx * rdx + rdy * rdy # dotProduct(rd, rd)
	var C2 = 2 * rdx * SX + 2 * rdy * SY # dotProduct(rd, s)
	var C3 = SX * SX + SY * SY - cr * cr # dotProduct(s, s) - cr^2
	
	var res = quadratic_equation(C1, C2, C3)
	
	if res.size() == 0:
		return;
		
	# Луч является бесконечным, поэтому мы так же увидим пересечение с синей частью луча
	if sign(res[0]) == -1 || sign(res[1]) == -1:
		return
	
	print('Collision t is ', res)
	
	var m_min = min(res[0], res[1])
	var m_max = max(res[0], res[1])
	
	# точки столкновения луча с окружностью
	var mp_min = Vector2(m_min * rdx + rx0, m_min * rdy + ry0) # ближняя
	var mp_max = Vector2(m_max * rdx + rx0, m_max * rdy + ry0) # дальняя
	
	draw_circle(mp_min, 4, Color(255, 255, 0))
	draw_circle(mp_max, 4, Color(0, 0, 255))
