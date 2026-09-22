import pytest
from routers.dev_os import SUBMASTER_REGISTRY, AGENT_REGISTRY, AGENT_RUNNERS
from routers.dev_os_sops import AGENT_SOPS

def test_fleet_hierarchy_and_cardinality():
    assert len(SUBMASTER_REGISTRY) == 9, f"Expected 9 submasters, got {len(SUBMASTER_REGISTRY)}"
    assert len(AGENT_REGISTRY) == 37, f"Expected 37 agents in AGENT_REGISTRY, got {len(AGENT_REGISTRY)}"
    assert len(AGENT_RUNNERS) == 37, f"Expected 37 agent runners, got {len(AGENT_RUNNERS)}"

def test_all_agents_have_valid_runners_and_sops():
    registry_ids = {a["id"] for a in AGENT_REGISTRY}
    runner_ids = set(AGENT_RUNNERS.keys())
    
    # Mathematical 1:1 parity between registry and execution runners
    assert registry_ids == runner_ids, f"Diff: {registry_ids ^ runner_ids}"
    
    # Every agent must have a documented SOP
    for aid in registry_ids:
        assert aid in AGENT_SOPS, f"Agent {aid} missing SOP in AGENT_SOPS"

def test_all_submasters_have_valid_sops_and_unique_children():
    all_supervised_agents = []
    for sm in SUBMASTER_REGISTRY:
        sm_id = sm["id"]
        assert sm_id in AGENT_SOPS, f"Submaster {sm_id} missing SOP"
        assert len(sm["agents"]) > 0, f"Submaster {sm_id} has no children"
        all_supervised_agents.extend(sm["agents"])
    
    # Exactly 37 agents assigned with zero duplicates
    assert len(all_supervised_agents) == 37
    assert len(set(all_supervised_agents)) == 37
