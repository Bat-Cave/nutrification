create table users (
    user_id serial primary key,
    email varchar(150),
    password varchar(150),
    profile_pic varchar(250),
    height int,
    weight int,
    age int,
    activity_level varchar(150),
    rec_daily_calorie int
);

create table macronutrients (
    m_id serial primary key,
    m_name varchar(150),
    m_type varchar(150),
    m_recommended decimal,
    m_units varchar(5)
);

create table nutrition_history (
    entry_id serial primary key,
    user_id int,
    meal_name varchar(100),
    entry_date varchar(12),
    entry_time varchar(20),
    biotin varchar(100),
    folate_folic_acid varchar(100),
    niacin varchar(100),
    pantothenic_acid varchar(100),
    riboflavin varchar(100),
    thiamin varchar(100),
    vitamin_a varchar(100),
    vitamin_b6 varchar(100),
    vitamin_b12 varchar(100),
    vitamin_c varchar(100),
    vitamin_d varchar(100),
    vitamin_e varchar(100),
    vitamin_k varchar(100),
    calcium varchar(100),
    chloride varchar(100),
    chromium varchar(100),
    copper varchar(100),
    iodine varchar(100),
    iron varchar(100),
    magnesium varchar(100),
    mangenese varchar(100),
    molybdenum varchar(100),
    phosphorus varchar(100),
    potassium varchar(100),
    selenium varchar(100),
    sodium varchar(100),
    zinc varchar(100),
    protein varchar(100),
    fiber varchar(100),
    water varchar(100),
    carbohydrates varchar(100)
);