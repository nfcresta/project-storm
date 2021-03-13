DROP TABLE if exists storms;

create TABLE storms (
  event_id INT  NOT NULL,
  state VARCHAR NOT NULL,
  event_type VARCHAR NOT NULL,
  event_begin_time TIMESTAMP,
  event_timezone VARCHAR,
	event_end_time TIMESTAMP,
	total_injuries INT,
	total_deaths INT,
	damage_property DEC,
	damage_crops DEC,
	magnitude DEC,
	event_latitude FLOAT,
	event_longitude FLOAT	
);

