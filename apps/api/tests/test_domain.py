import pytest
from domain.discounts import apply_discount

def test_apply_discount_caloha():
    code = "CALOHA"
    total = 1000
    expected = 900 # 10% off
    assert apply_discount(total, code) == expected

def test_apply_discount_invalid():
    code = "INVALID"
    total = 1000
    expected = 1000 # No change
    assert apply_discount(total, code) == expected

def test_apply_discount_none():
    code = None
    total = 500
    assert apply_discount(total, code) == 500
