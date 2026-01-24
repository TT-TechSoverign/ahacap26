
import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from database import Base, get_db
import models

# Use environment variable if available (Docker), else localhost (Local)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://user:password@localhost:5432/ahac_db")

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

products = [
    # LG Dual Inverter (Premium)
    {
        "id": 4, 
        "name": "LG Dual Inverter 6,000 BTU (LW6023IVSM)", 
        "price": 540, 
        "category": "WINDOW_AC", 
        "stock": 30, 
        "image_url": "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
        "btu": 6000,
        "voltage": "115V / 15 Amp",
        "coverage": "100–200 sq. ft. (Small Bedroom/Office)",
        "performance_specs": "44dB Ultra-Quiet Mode",
        "key_spec": "Ultra-Quiet Mode: Designed for bedroom sanctuaries.",
        "noise_level": "44 / 56 dB",
        "dehumidification": "2.3 Pts/Hr"
    },
    {
        "id": 5, 
        "name": "LG Dual Inverter 8,000 BTU (LW8022IVSM)", 
        "price": 575, 
        "category": "WINDOW_AC", 
        "stock": 50, 
        "image_url": "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
        "btu": 8000,
        "voltage": "115V / 15 Amp",
        "coverage": "100–200 sq. ft. (Small Bedroom/Office)",
        "performance_specs": "ThinQ® Smart Control",
        "key_spec": "ThinQ® Smart Integration: Precision remote climate control.",
        "noise_level": "44 / 58 dB",
        "dehumidification": "2.8 Pts/Hr"
    },
    {
        "id": 6, 
        "name": "LG Dual Inverter 10,000 BTU (LW1022IVSM)", 
        "price": 625, 
        "category": "WINDOW_AC", 
        "stock": 50, 
        "image_url": "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
        "btu": 10000,
        "voltage": "115V / 15 Amp",
        "coverage": "200–250 sq. ft. (Master / Studio)",
        "performance_specs": "2024 ENERGY STAR® Most Efficient",
        "key_spec": "2024 ENERGY STAR® Most Efficient",
        "noise_level": "44 / 59 dB",
        "dehumidification": "3.3 Pts/Hr"
    },
    {
        "id": 7, 
        "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)", 
        "price": 700, 
        "category": "WINDOW_AC", 
        "stock": 50, 
        "image_url": "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
        "btu": 12000,
        "voltage": "115V / 15 Amp",
        "coverage": "200–250 sq. ft. (Master / Studio)",
        "performance_specs": "Gold Fin™ Anti-Corrosive Coating",
        "key_spec": "Gold Fin™ Coating: Industrial-grade salt-air protection.",
        "noise_level": "44 / 59 dB",
        "dehumidification": "3.8 Pts/Hr"
    },
    {
        "id": 8, 
        "name": "LG Dual Inverter 15,000 BTU (LW1522IVSM)", 
        "price": 750, 
        "category": "WINDOW_AC", 
        "stock": 50, 
        "image_url": "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
        "btu": 15000,
        "voltage": "115V / 15 Amp",
        "coverage": "250–350 sq. ft. (Living / Large Master)",
        "performance_specs": "4-Way Air Directional Control",
        "key_spec": "High-Torque Compressor: Rapid moisture removal in large rooms.",
        "noise_level": "52 / 62 dB",
        "dehumidification": "4.4 Pts/Hr"
    },
    {
        "id": 9, 
        "name": "LG Dual Inverter 18,000 BTU (LW1822IVSM)", 
        "price": 875, 
        "category": "WINDOW_AC", 
        "stock": 30, 
        "image_url": "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
        "btu": 18000,
        "voltage": "208/230V / 20 Amp",
        "coverage": "400+ sq. ft. (Open Floor Plan)",
        "performance_specs": "High-Capacity Moisture Removal",
        "key_spec": "Maximum Vertical Momentum: For vaulted ceilings.",
        "noise_level": "52 / 63 dB",
        "dehumidification": "5.5 Pts/Hr"
    },
    {
        "id": 10, 
        "name": "LG Dual Inverter 24,000 BTU (LW2422IVSM)", 
        "price": 975, 
        "category": "WINDOW_AC", 
        "stock": 20, 
        "image_url": "/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.svg",
        "btu": 23500,
        "voltage": "208/230V / 20 Amp",
        "coverage": "400+ sq. ft. (Industrial Scale Open Plan)",
        "performance_specs": "Industrial-Grade Titan Cooling",
        "key_spec": "Maximum Moisture Management and Cooling.",
        "noise_level": "53 / 64 dB",
        "dehumidification": "7.1 Pts/Hr"
    },

    # LG Universal Fit / Through The Wall (Heating & Cooling)
    {
        "id": 11,
        "name": "LG Universal Fit / Through The Wall 8,000 BTU (LW8023HRSM)",
        "price": 650,
        "category": "WINDOW_AC",
        "stock": 40,
        "image_url": "/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW8023HRSM.svg",
        "btu": 8000,
        "voltage": "115V / 15 Amp",
        "coverage": "100–200 sq. ft. (Small Bedroom/Office)",
        "performance_specs": "Dual-Climate",
        "key_spec": "Dual-Climate Optimization: Precision 7,000 BTU Heating.",
        "noise_level": "53 / 58 dB",
        "dehumidification": "2.1 Pts/Hr"
    },
    {
        "id": 12,
        "name": "LG Universal Fit / Through The Wall 18,000 BTU (LW1823HRSM)",
        "price": 875,
        "category": "WINDOW_AC",
        "stock": 25,
        "image_url": "/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW1823HRSM.svg",
        "btu": 18000,
        "voltage": "208/230V / 20 Amp",
        "coverage": "400+ sq. ft. (Open Floor Plan)",
        "performance_specs": "ThinQ® Smart Control",
        "key_spec": "High-Capacity Moisture Removal: 4.8 Pts/Hr extraction.",
        "noise_level": "56 / 62 dB",
        "dehumidification": "4.8 Pts/Hr"
    },
    {
        "id": 13,
        "name": "LG Universal Fit / Through The Wall 24,000 BTU (LW2423HRSM)",
        "price": 975,
        "category": "WINDOW_AC",
        "stock": 20,
        "image_url": "/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW2423HRSM.svg",
        "btu": 23500,
        "voltage": "208/230V / 20 Amp",
        "coverage": "400+ sq. ft. (Industrial Scale Open Plan)",
        "performance_specs": "Industrial-Grade Cooling & Heating",
        "key_spec": "Supplemental 12,000 BTU Heating capacity.",
        "noise_level": "58 / 64 dB",
        "dehumidification": "6.8 Pts/Hr"
    },

    # LG Base / Standard Solutions
    {
        "id": 14, 
        "name": "LG 8,000 BTU (LW8024RD)", 
        "price": 395, 
        "category": "WINDOW_AC", 
        "stock": 20, 
        "image_url": "/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-1600x1000.svg",
        "btu": 8000, 
        "voltage": "115V / 15 Amp",
        "coverage": "100–200 sq. ft. (Bedroom/Office)",
        "performance_specs": "High-Velocity Airflow",
        "key_spec": "Rapid Cool Start: High-torque tropical cycle.",
        "noise_level": "54 / 58 dB",
        "dehumidification": "2.1 Pts/Hr"
    },
    {
        "id": 15, 
        "name": "LG 10,000 BTU (LW1017ERSM1)", 
        "price": 525, 
        "category": "WINDOW_AC", 
        "stock": 20, 
        "image_url": "/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-1600x1000.svg",
        "btu": 10000, 
        "voltage": "115V / 15 Amp",
        "coverage": "200–250 sq. ft. (Master/Studio)",
        "performance_specs": "ThinQ® Smart Control",
        "key_spec": "Smart Diagnosis™: Integrated system verification.",
        "noise_level": "52 / 59 dB",
        "dehumidification": "3.0 Pts/Hr"
    },
    {
        "id": 16, 
        "name": "LG 12,000 BTU (LW1217ERSM1)", 
        "price": 600, 
        "category": "WINDOW_AC", 
        "stock": 20, 
        "image_url": "/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-1600x1000.svg",
        "btu": 12000, 
        "voltage": "115V / 15 Amp",
        "coverage": "200–250 sq. ft. (Master/Studio)",
        "performance_specs": "ThinQ® Smart Control",
        "key_spec": "Gold Fin™ Anti-Corrosive Shield.",
        "noise_level": "52 / 59 dB",
        "dehumidification": "3.8 Pts/Hr"
    },
    
    # GE Performance Series (New AJCQ models)
    {
        "id": 17,
        "name": "GE Performance 8,000 BTU (AJCQ08AWJ)",
        "price": 1000,
        "category": "WINDOW_AC",
        "stock": 15,
        "image_url": "/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.svg",
        "btu": 8000,
        "voltage": "115V / 15 Amp",
        "coverage": "100–200 sq. ft.",
        "performance_specs": "True Universal Fit",
        "key_spec": "Designed to slide directly into existing 26\" wall sleeves.",
        "noise_level": "54 / 59 dB",
        "dehumidification": "2.1 Pts/Hr"
    },
    {
        "id": 18,
        "name": "GE Performance 10,000 BTU (AJCQ10AWJ)",
        "price": 1100,
        "category": "WINDOW_AC",
        "stock": 12,
        "image_url": "/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.svg",
        "btu": 10000,
        "voltage": "115V / 15 Amp",
        "coverage": "200–250 sq. ft.",
        "performance_specs": "High-Velocity Airflow",
        "key_spec": "Engineered with high-torque fans to maximize air throw.",
        "noise_level": "55 / 61 dB",
        "dehumidification": "2.7 Pts/Hr"
    },
    {
        "id": 19,
        "name": "GE Performance 12,000 BTU (AJCQ12AWJ)",
        "price": 1200,
        "category": "WINDOW_AC",
        "stock": 10,
        "image_url": "/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-performance-series-front-1600x1000.svg",
        "btu": 12000,
        "voltage": "115V / 15 Amp",
        "coverage": "200–250 sq. ft.",
        "performance_specs": "Power Failure Recovery",
        "key_spec": "Automatically restarts at previous settings after outages.",
        "noise_level": "56 / 62 dB",
        "dehumidification": "3.4 Pts/Hr"
    },

    # Casement / Wall Case
    {
        "id": 21,
        "name": "GE RAB26A Wall Case",
        "price": 225,
        "category": "WINDOW_AC",
        "stock": 25,
        "image_url": "/assets/window-unit-images/ge-units/rab26a-ge-lg-universal-casement-slider-1600x1000/RAB26A.svg",
        "btu": 0,
        "voltage": "N/A",
        "coverage": "Universal 26\" Standard",
        "performance_specs": "Quick Snap Assembly",
        "key_spec": "Baked enamel finish galvanized steel. Includes RAG13A Grille.",
        "noise_level": "N/A",
        "dehumidification": "N/A"
    },
]

async def seed():
    async with AsyncSessionLocal() as session:
        print("Dropping and recreating products table...")
        await session.execute(text("DROP TABLE IF EXISTS products CASCADE"))
        await session.commit()
    
    # Re-import to ensure Base has updated models
    from database import engine, Base
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        print("Seeding new products...")
        for p in products:
            new_product = models.Product(**p)
            session.add(new_product)

        await session.commit()
        print("Done!")

if __name__ == "__main__":
    asyncio.run(seed())
